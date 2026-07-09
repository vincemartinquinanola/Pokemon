import { ref } from "vue"

import { pokemonService } from "@/service/pokemonService"

import type { Pokemon } from "@/types/pokemon"

export function usePokemon() {
    const pokemonList = ref<Pokemon[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const limit = 50
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

            const results = await Promise.allSettled(

                response.results.map(async (pokemonSummary) => {
                    const pokemon = await pokemonService.getPokemonByNameOrId(
                        pokemonSummary.name
                    )

                    let is_legendary = false
                    let is_mythical = false

                    try {
                        const species = await pokemonService.getPokemonSpecies(
                            pokemon.id
                        )
                        is_legendary = species.is_legendary ?? false
                        is_mythical = species.is_mythical ?? false
                    } catch {
                        // some alt forms (Mega/Gmax/regional) have no matching
                        // species entry at this id — skip legendary/mythical flags
                    }

                    return { ...pokemon, is_legendary, is_mythical }
                })
            )

            const pokemon = results
                .filter((r): r is PromiseFulfilledResult<Pokemon & { is_legendary: boolean; is_mythical: boolean }> =>
                    r.status === "fulfilled"
                )
                .map((r) => r.value)

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

    async function fetchPokemonByNameOrId(nameOrId: string) {
        try {
            const pokemon = await pokemonService.getPokemonByNameOrId(nameOrId)

            let is_legendary = false
            let is_mythical = false

            try {
                const species = await pokemonService.getPokemonSpecies(
                    pokemon.id
                )

                is_legendary = species.is_legendary ?? false
                is_mythical = species.is_mythical ?? false
            } catch {
                // Ignore if species lookup fails
            }

            return {
                ...pokemon,
                is_legendary,
                is_mythical
            }
        } catch {
            return null
        }
    }


    return {
        pokemonList,
        loading,
        error,
        fetchPokemonList,
        fetchPokemonByNameOrId,
        hasMore
    }
}   