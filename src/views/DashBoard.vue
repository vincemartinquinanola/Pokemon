<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import PokemonModal from "@/components/PokemonModal.vue"
import PokemonGrid from "@/components/PokemonGrid.vue"
import PokemonSkeleton from "@/components/PokemonSkeleton.vue"
import SearchBar from "@/components/SearchBar.vue"

import { usePokemon } from "@/composables/usePokemon"

import type { Pokemon } from "@/types/pokemon"

const selectedPokemon = ref<Pokemon | null>(null)

const {
    pokemonList,
    loading,
    error,
    fetchPokemonList,
    fetchPokemonByNameOrId,
    hasMore
} = usePokemon()

const search = ref("")

const displayedPokemon = ref<Pokemon[]>([])

onMounted(async () => {
    await fetchPokemonList()
    displayedPokemon.value = pokemonList.value
})

function selectPokemon(pokemon: Pokemon) {
    selectedPokemon.value = pokemon
}

function closeModal() {
    selectedPokemon.value = null
}

async function handleSearch(value: string) {

    search.value = value.trim()

    // Empty search → restore loaded Pokémon
    if (!search.value) {
        displayedPokemon.value = pokemonList.value
        return
    }

    // Search loaded Pokémon first
    const localResults = pokemonList.value.filter(pokemon =>
        pokemon.name
            .toLowerCase()
            .includes(search.value.toLowerCase()) ||

        pokemon.id.toString() === search.value
    )

    if (localResults.length > 0) {
        displayedPokemon.value = localResults
        return
    }

    // Search API
    const remote = await fetchPokemonByNameOrId(search.value)

    if (remote) {
        displayedPokemon.value = [remote]
    } else {
        displayedPokemon.value = []
    }
}
</script>

<template>
    <main class="container">

        <SearchBar @search="handleSearch" />

        <div v-if="loading" class="skeleton-grid">
            <PokemonSkeleton v-for="n in 20" :key="n" />
        </div>

        <p v-else-if="error" class="error">
            {{ error }}
        </p>

        <PokemonGrid v-else :pokemons="displayedPokemon" @select="selectPokemon" />

        <div class="load-more">
            <button v-if="hasMore && !loading" @click="fetchPokemonList">
                Load More
            </button>
        </div>
        <PokemonModal v-if="selectedPokemon" :pokemon="selectedPokemon" @close="closeModal" />
    </main>
</template>

<style scoped>
.container {
    max-width: 1400px;
    margin: auto;
    padding: 2rem;
}

.error {
    text-align: center;
    color: red;
}

.load-more {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}

.load-more button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,
            minmax(220px, 1fr));
    gap: 1.5rem;
}
</style>