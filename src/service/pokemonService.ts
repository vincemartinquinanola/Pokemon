
import type {
    Pokemon, 
    PokemonListResponse,
    PokemonSpecies 
} from "@/types/pokemon"

const BASE_URL = "https://pokeapi.co/api/v2"

export const pokemonService =  {
    async getPokemonList(
        limit = 50,
        offset = 0
    ): Promise<PokemonListResponse> {
        const response = await fetch(
            `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
        )
        if (!response.ok) {
            throw new Error("Failed to fetch Pokemon list")
        }
        return (await response.json()) as PokemonListResponse
    },
    async getPokemonByNameOrId(
        identifier: string | number
    ): Promise<Pokemon> {
        const response = await fetch(
            `${BASE_URL}/pokemon/${identifier}`
        )
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon with identifier: ${identifier}`)
        }
        return (await response.json()) as Pokemon
    },

    async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    const response = await fetch(
        `${BASE_URL}/pokemon-species/${id}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon species.")
    }

    return response.json()
}
}

