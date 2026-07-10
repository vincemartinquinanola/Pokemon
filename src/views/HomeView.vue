<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const video = ref<HTMLVideoElement>()

const isUnmuted = ref(false)

async function handleClick() {
    if (!video.value) return

    // First click: unmute only
    if (!isUnmuted.value) {
        isUnmuted.value = true

        video.value.muted = false

        try {
            await video.value.play()
        } catch (error) {
            console.error(error)
        }

        return
    }

    // Second click: enter dashboard
    enterDashboard()
}

function enterDashboard() {
    video.value?.pause()
    router.push("/dashboard")
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        enterDashboard()
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
    <main class="home" @click="handleClick">
        <video ref="video" autoplay playsinline loop muted>
            <source src="@/assets/intro.mp4" type="video/mp4" />
        </video>

        <div class="overlay">

            <h1>CYBER POKÉDEX</h1>

            <p>Click anywhere to unmute</p>
            <p>Click anywhere or press Esc to continue</p>

        </div>
    </main>
</template>

<style scoped>
.home {
    position: fixed;
    inset: 0;

    overflow: hidden;

    cursor: pointer;
}

video {
    width: 100%;
    height: 100%;

    object-fit: cover;
}

.overlay {

    position: absolute;
    inset: 0;

    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    color: white;

    background: rgba(0, 0, 0, .25);

    backdrop-filter: blur(2px);
}

.overlay h1 {

    font-size: 4rem;

    letter-spacing: .4rem;

    text-shadow:
        0 0 20px cyan;
}

.overlay p {

    margin-top: 2rem;

    animation: blink 1s infinite;
}

@keyframes blink {

    50% {

        opacity: .3;
    }
}
</style>