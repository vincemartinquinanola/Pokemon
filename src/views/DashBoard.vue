<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import PokemonModal from "@/components/PokemonModal.vue"
import PokemonGrid from "@/components/PokemonGrid.vue"
import PokemonSkeleton from "@/components/PokemonSkeleton.vue"
import SearchBar from "@/components/SearchBar.vue"
import { usePokemon } from "@/composables/usePokemon"
import PokemonSidebar from "@/components/PokemonSidebar.vue"
import type { Pokemon } from "@/types/pokemon"

const selectedPokemon = ref<Pokemon | null>(null)

const showModal = ref(false)

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
    showModal.value = false
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

        <div class="dashboard">

            <PokemonSidebar :pokemon="selectedPokemon" @open="showModal = true" />

            <div>

                <PokemonGrid :pokemons="displayedPokemon" @select="selectPokemon" />

            </div>

        </div>

        <div class="load-more">
            <button v-if="hasMore && !loading" @click="fetchPokemonList">
                Load More
            </button>
        </div>
        <PokemonModal v-if="selectedPokemon && showModal" :pokemon="selectedPokemon" @close="closeModal" />
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
    width: max(120px, 5%);
    padding: 0.75rem 1.5rem;
    background: #38bdf8;
    color: black;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 999px;
}


.load-more button:hover {
  background: #30b8f6;
  box-shadow:
      0 0 20px #50c0f0;
}

.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,
            minmax(220px, 1fr));
    gap: 1.5rem;
}

.dashboard {

    display: grid;

    grid-template-columns: 320px 1fr;

    gap: 2rem;

    align-items: start;

}

.sidebar {

    cursor: pointer;

    transition: .3s;

}

.sidebar:hover {

    transform: translateY(-4px);

    box-shadow:
        0 0 20px cyan,
        0 0 40px cyan;

}
</style>