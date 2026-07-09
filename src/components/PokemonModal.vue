<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Pokemon } from "@/types/pokemon"
import TypeBadge from "./TypeBadge.vue"
import { computed } from "vue"

const scanning = ref(true)

onMounted(() => {
  setTimeout(() => {
    scanning.value = false
  }, 1200)
})

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

      <div v-if="scanning" class="scanner">
        <h2>INITIALIZING SCANNER...</h2>

        <div class="progress">
          <div class="progress-fill"></div>
        </div>

        <div class="terminal">
          <p>> Establishing secure connection...</p>
          <p>> Connecting to Pokédex database...</p>
          <p>> Scanning target: {{ pokemon.name.toUpperCase() }}</p>
          <p>> Reading biological signature...</p>
          <p>> Loading battle statistics...</p>
          <p>> Rendering holographic profile...</p>
        </div>
        <div v-if="pokemon.is_legendary" class="warning">
          ⚠ LEGENDARY LIFEFORM DETECTED
        </div>

        <div v-else-if="pokemon.is_mythical" class="warning mythical">
          ✦ MYTHICAL ENTITY CONFIRMED
        </div>

      </div>
      <template v-else>

        <div v-if="pokemon.is_legendary" class="legendary-badge">
          LEGENDARY
        </div>

        <div v-else-if="pokemon.is_mythical" class="mythical-badge">
          MYTHICAL
        </div>
        <img class="pokemon-image" :src="`https://play.pokemonshowdown.com/sprites/ani/${pokemon.name}.gif`" :alt="pokemon.name" />

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

      </template>
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

.pokemon-image {
  width: 200px;
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

.scanner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  gap: 1rem;
}

.progress {
  width: 100%;
  height: 12px;
  background: #1e293b;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  width: 100%;
  height: 100%;
  background: #38bdf8;
  transform-origin: left;
  animation: scan 1.2s linear forwards;
}

@keyframes scan {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.terminal {

  width: 100%;

  font-family: monospace;

  color: #38bdf8;

  opacity: .9;
}

.warning {
    margin-top: 1rem;

    color: gold;

    font-weight: bold;

    text-shadow: 0 0 12px gold;

    animation: pulse 1s infinite alternate;
}

.warning.mythical {
    color: #ff66ff;

    text-shadow: 0 0 12px #ff66ff;
}

@keyframes pulse {
    from {
        opacity: 0.5;
    }

    to {
        opacity: 1;
    }
}
@media (max-width: 600px) {
    .modal {
        height: max(300px, 70vh);
        padding: 1.25rem;
        border-radius: 12px;
    }

    .pokemon-image {
        width: 130px;
    }
    h1 {
        font-size: 1.5rem;
    }
    .stat-header {

        font-size: .8rem;
    }
    .abilities {
        font-size: .8rem;
    }
}

</style>