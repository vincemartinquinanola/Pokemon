<script setup lang="ts">
import type { Pokemon } from "@/types/pokemon"
import TypeBadge from "./TypeBadge.vue"
import { computed } from "vue"


const props = defineProps<{
    pokemon: Pokemon
}>()

const emit = defineEmits<{
    (e: "select"): void
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
</script>

<template>
    <div class="pokemon-card" @click="emit('select')" :class="rarity">
        <div v-if="pokemon.is_legendary" class="legendary-badge">
            LEGENDARY
        </div>

        <div v-else-if="pokemon.is_mythical" class="mythical-badge">
            MYTHICAL
        </div>
        <img :src="`https://play.pokemonshowdown.com/sprites/ani/${pokemon.name}.gif`" :alt="pokemon.name" />
        <p class="number">
            #{{ pokemon.id.toString().padStart(4, "0") }}
        </p>

        <h2>
            {{ pokemon.name }}
        </h2>

        <div class="types">
            <TypeBadge v-for="type in pokemon.types" :key="type.slot" :type="type.type.name" />
        </div>
    </div>
</template>

<style scoped>
.pokemon-card {
    background: #2e416b;
    border: 1px solid rgba(56, 189, 248, .15);
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;

    box-shadow:
        0 8px 20px rgba(0, 0, 0, .08);

    transition:
        transform .25s ease,
        box-shadow .25s ease;
}

.pokemon-card:hover {
    transform:
        translateY(-10px) scale(1.03);

    border-color: #38bdf8;

    box-shadow:
        0 0 25px #38bdf8,
        0 0 50px rgba(56, 189, 248, .3);
}

img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

h2 {
    margin-top: .5rem;
    text-transform: capitalize;
}

.number {
    color: gray;
    margin-bottom: .75rem;
}

.types {
    display: flex;
    justify-content: center;
    gap: .5rem;
    flex-wrap: wrap;
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

  background: linear-gradient(
    90deg,
    #FFD700,
    #FFB800
  );

  box-shadow:
    0 0 15px gold;
}

.mythical-badge {
  color: white;

  background: linear-gradient(
    90deg,
    #ff00cc,
    #7b2cff
  );

  box-shadow:
    0 0 18px #ff00cc;
}
</style>