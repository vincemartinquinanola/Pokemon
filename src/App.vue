<script setup lang="ts">
import { computed, onMounted, ref } from "vue"

import PokemonModal from "@/components/PokemonModal.vue"

import type { Pokemon } from "@/types/pokemon"

import PokemonGrid from "@/components/PokemonGrid.vue"

import { usePokemon } from "@/composables/usePokemon"

import SearchBar from "@/components/SearchBar.vue"

const search = ref("")

const filteredPokemon = computed(() => {
    if (!search.value.trim()) {
        return pokemonList.value
    }

    return pokemonList.value.filter((pokemon) =>
        pokemon.name
            .toLowerCase()
            .includes(search.value.toLowerCase())
    )
})

const selectedPokemon = ref<Pokemon | null>(null)

function selectPokemon(pokemon: Pokemon) {
    selectedPokemon.value = pokemon
}

function closeModal() {
    selectedPokemon.value = null
}

const {
    pokemonList,
    loading,
    error,
    fetchPokemonList,
    hasMore
} = usePokemon()

onMounted(() => {
    fetchPokemonList()
})

function handleSearch(value: string) {
    search.value = value
}
</script>

<template>
    <main class="container">
        <h1>Pokédex</h1>

        <SearchBar @search="handleSearch" />

        <p v-if="loading">Loading Pokémon...</p>

        <p v-else-if="error" class="error">
            {{ error }}
        </p>

        <PokemonGrid v-else :pokemons="filteredPokemon" @select="selectPokemon" />

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

h1 {
    text-align: center;
    font-size: 3rem;
    letter-spacing: .4rem;
    color: #38bdf8;
    text-shadow:
      0 0 10px #38bdf8,
      0 0 30px #38bdf8;
    margin-bottom: 2rem;
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
</style>