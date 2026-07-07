<script setup lang="ts">
import { ref } from "vue"

const search = ref("")

const emit = defineEmits<{
  (e: "search", value: string): void
}>()

function handleSearch() {
  emit("search", search.value.trim())
}
</script>

<template>
  <div class="search-bar">
    <input
      v-model="search"
      type="text"
      placeholder="Search Pokémon by name or ID..."
      @keyup.enter="handleSearch"
    />

    <button type="button" @click="handleSearch">
      Search
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  background: #111827;
  color: white;
  padding: 0.75rem;
  border: 2px solid #38bdf8;
  border-radius: 999px;
}

input:focus {
  outline: none;

  box-shadow:
      0 0 20px #38bdf8;
}

button {
  padding: 0.75rem 1.5rem;
  background: #38bdf8;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 999px;
}
</style>