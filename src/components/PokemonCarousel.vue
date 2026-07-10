<!-- <script setup lang="ts">
import type { Pokemon } from "@/types/pokemon"

import { ref, watch } from "vue"

const activeIndex = ref(0)

const props = defineProps<{
    pokemons: Pokemon[]
}>()

const emit = defineEmits<{
    (e: "select", pokemon: Pokemon): void
}>()

watch(
    activeIndex,
    () => {
        const pokemon = props.pokemons[activeIndex.value]

        if (!pokemon) return

        emit("select", pokemon)
    },
    {
        immediate: true
    }
)

function onWheel(event: WheelEvent) {

    if (event.deltaY > 0) {
        activeIndex.value++
    } else {
        activeIndex.value--
    }

    if (activeIndex.value < 0) {
        activeIndex.value = 0
    }

    if (activeIndex.value >= props.pokemons.length) {
        activeIndex.value = props.pokemons.length - 1
    }
}

function cardStyle(index: number) {

    const offset = index - activeIndex.value

    const x = offset * 170
    const y = Math.abs(offset) * 18

    const scale = Math.max(0.55, 1 - Math.abs(offset) * 0.12)

    const rotate = offset * 8

    const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.18)

    const zIndex = 100 - Math.abs(offset)

    return {
        left: "50%",
        top: "50%",
        transform: `
            translate(-50%, -50%)
            translate(${x}px, ${y}px)
            scale(${scale})
            rotate(${rotate}deg)
        `,
        opacity,
        zIndex
    }
}
</script>

<template>
    <div class="carousel" @wheel.prevent="onWheel">

        <div v-for="(pokemon, index) in pokemons" :key="pokemon.id" class="hero" :style="cardStyle(index)">

            {{ pokemon.name }}

        </div>

    </div>
</template>

<style scoped>
.carousel {

    height: 550px;

    position: relative;

    overflow: hidden;

    display: flex;

    justify-content: center;

    align-items: center;

}

.hero {

    position: absolute;

    width: 220px;

    transition:
        transform .35s ease,
        opacity .35s ease;

    transform-origin: center bottom;

    cursor: pointer;

}
</style> -->
