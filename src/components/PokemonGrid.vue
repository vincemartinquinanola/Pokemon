<script setup lang="ts">
import PokemonCard from "./PokemonCard.vue"

import type { Pokemon } from "@/types/pokemon"

defineProps<{
  pokemons: Pokemon[]
}>()

const emit = defineEmits<{
  (e: "select", pokemon: Pokemon): void
}>()
</script>

<template>
    <div class="pokemon-grid">
        <PokemonCard
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            @click="emit('select', pokemon)"
            @select="emit('select', pokemon)"
        />
    </div>
</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
</style>
