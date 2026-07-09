<script setup lang="ts">
import { ref, onMounted } from "vue"

import { Game } from "@/game/Game"

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {

    if (!canvas.value) return

    const game = new Game(canvas.value)

    game.start()

})
</script>

<template>

<div class="game">

<canvas
ref="canvas"
width="900"
height="400"
/>

</div>

</template>

<style scoped>
.game {

  display: flex;

  justify-content: center;

  margin-top: 40px;

}

canvas {

  border: 2px solid cyan;

  background: #111827;

}
</style>