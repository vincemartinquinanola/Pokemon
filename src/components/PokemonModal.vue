<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Pokemon } from "@/types/pokemon"
import TypeBadge from "./TypeBadge.vue"
import { computed } from "vue"

const props = defineProps<{
  pokemon: Pokemon
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const rarity = computed(() => {

  if (props.pokemon.is_mythical) {
    return "mythical"
  }

  if (props.pokemon.is_legendary) {
    return "legendary"
  }

  return "normal"
})

const animated = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    animated.value = true
  })
})

function getStatColor(stat: string) {
    switch (stat) {

        case "hp":
            return "#ef4444"

        case "attack":
            return "#22c55e"

        case "defense":
            return "#3b82f6"

        case "special-attack":
            return "#a855f7"

        case "special-defense":
            return "#06b6d4"

        case "speed":
            return "#eab308"

        default:
            return "#38bdf8"
    }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal" :class="rarity">

      <button class="close" @click="emit('close')">
        ✕
      </button>

      <div v-if="pokemon.is_legendary" class="legendary-badge">
        LEGENDARY
      </div>

      <div v-else-if="pokemon.is_mythical" class="mythical-badge">
        MYTHICAL
      </div>
      <img class="pokemon-image" :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" />

      <p class="number">
        #{{ pokemon.id.toString().padStart(4, "0") }}
      </p>

      <h1>{{ pokemon.name }}</h1>

      <div class="types">
        <TypeBadge v-for="type in pokemon.types" :key="type.slot" :type="type.type.name" />
      </div>

      <div class="info">
        <div>
          <h4>Height</h4>
          <p>{{ pokemon.height }}</p>
        </div>

        <div>
          <h4>Weight</h4>
          <p>{{ pokemon.weight }}</p>
        </div>
      </div>

      <h3>Abilities</h3>

      <div class="abilities">
        <span v-for="ability in pokemon.abilities" :key="ability.slot" class="ability">
          {{ ability.ability.name }}
        </span>
      </div>

      <h3>Base Stats</h3>

      <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat">
        <div class="stat-header">
          <span>{{ stat.stat.name }}</span>
          <strong>{{ stat.base_stat }}</strong>
        </div>

        <div class="bar">
          <div class="fill" :style="{
            width: animated
              ? `${Math.min(stat.base_stat, 100)}%`
              : '0%',

              background: getStatColor(stat.stat.name)
          }" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .6);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
}

.modal {
  position: relative;

  width: min(500px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  color: white;
  background: #0f172a;
  border: 1px solid #38bdf8;
  border-radius: 20px;
  padding: 2rem;
  box-shadow:
    0 0 40px rgba(56, 189, 248, .4);
}

.close {
  position: absolute;
  right: 1rem;
  top: 1rem;

  border: none;
  background: none;

  font-size: 1.25rem;

  cursor: pointer;
}

.pokemon-image {
  width: 220px;
  display: block;
  margin: auto;
}

.number {
  text-align: center;
  color: gray;
}

h1 {
  text-align: center;
  text-transform: capitalize;
}

.types {
  display: flex;
  justify-content: center;
  gap: .5rem;

  margin: 1rem 0;
}

.info {
  display: flex;
  justify-content: space-around;

  text-align: center;

  margin: 2rem 0;
}

.abilities {
  display: flex;
  flex-wrap: wrap;
  color: #208dbc;
  font-weight: bold;

  gap: .5rem;

  margin-bottom: 2rem;
}

.ability {
  padding: .4rem .8rem;

  border-radius: 999px;

  background: #f2f2f2;
}

.stat {
  margin-bottom: 1rem;
}

.stat-header {
  display: flex;
  justify-content: space-between;

  margin-bottom: .25rem;

  text-transform: capitalize;
}

.bar {
  width: 100%;
  height: 10px;

  border-radius: 999px;

  background: #ddd;

  overflow: hidden;
}

.fill {
  height: 100%;
  transition:
        width .8s ease;

  border-radius: inherit;

  background: #42b883;
  box-shadow:
        0 0 10px currentColor;
}

.legendary {
  border: 2px solid gold;

  box-shadow:
    0 0 20px gold,
    0 0 40px orange,
    0 0 80px gold;

  animation: legendaryGlow 2s infinite alternate;
}

.mythical {
  border: 2px solid deeppink;

  box-shadow:
    0 0 20px hotpink,
    0 0 50px violet,
    0 0 90px cyan;

  animation: mythicalGlow 1.5s infinite alternate;
}

@keyframes legendaryGlow {
  from {
    filter: brightness(1);
  }

  to {
    filter: brightness(1.35);
  }
}

@keyframes mythicalGlow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.02);
  }
}

.legendary-badge,
.mythical-badge {
  display: inline-block;

  margin-bottom: 1rem;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 0.75rem;

  font-weight: 700;

  letter-spacing: 0.08rem;
}

.legendary-badge {
  color: black;

  background: linear-gradient(90deg,
      #FFD700,
      #FFB800);

  box-shadow:
    0 0 15px gold;
}

.mythical-badge {
  color: white;

  background: linear-gradient(90deg,
      #ff00cc,
      #7b2cff);

  box-shadow:
    0 0 18px #ff00cc;
}
</style>