<script setup lang="ts">
import { TYPE_STYLES } from "@/constants/pokemonTypes"

const props = defineProps<{
  type: string
}>()

const style = TYPE_STYLES[props.type] ?? {
  background: "#666",
  glow: "#999"
}
</script>

<template>
  <span
    class="badge"
    :style="{
      background: style.background,
      boxShadow: `0 0 12px ${style.glow}`
    }"
  >
    {{ type }}
  </span>
</template>

<style scoped>
.badge {
  color: white;

  padding: 6px 14px;

  border-radius: 999px;

  font-size: .8rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: .08rem;

  transition: all .25s ease;
}

.badge:hover {
  transform: scale(1.08);
}
</style>