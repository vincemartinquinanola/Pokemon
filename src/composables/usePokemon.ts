import { ref } from "vue"

import { pokemonService } from "@/service/pokemonService"

import type { Pokemon } from "@/types/pokemon"

export function usePokemon() {
    const pokemonList = ref<Pokemon[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const limit = 200
    const offset = ref(0)
    const hasMore = ref(true)

    async function fetchPokemonList() {
        loading.value = true
        error.value = null

        try {
            const response = await pokemonService.getPokemonList(
                limit,
                offset.value
            )

            const pokemon = await Promise.all(
                response.results.map(async (pokemonSummary) => {

                    const pokemon =
                        await pokemonService.getPokemonByNameOrId(
                            pokemonSummary.name
                        )

                    const species =
                        await pokemonService.getPokemonSpecies(
                            pokemon.id
                        )

                    return {
                        ...pokemon,

                        is_legendary: species.is_legendary,

                        is_mythical: species.is_mythical
                    }
                })
            )

            pokemonList.value.push(...pokemon)

            offset.value += limit

            hasMore.value = response.next !== null

        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message
            } else {
                error.value = "Something went wrong."
            }
        } finally {
            loading.value = false
        }
    }

    return {
        pokemonList,
        loading,
        error,
        fetchPokemonList,
        hasMore
    }
}   