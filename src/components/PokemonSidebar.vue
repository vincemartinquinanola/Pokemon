<script setup lang="ts">
import type { Pokemon } from "@/types/pokemon"
import { computed, ref, watch } from "vue"
import TypeBadge from "./TypeBadge.vue"

const props = defineProps<{
    pokemon: Pokemon | null
}>()
const emit = defineEmits<{
    (e: "open"): void
}>()
const scanning = ref(false)
const rarity = computed(() => {
    if (!props.pokemon) return "normal"

    if (props.pokemon.is_mythical) return "mythical"

    if (props.pokemon.is_legendary) return "legendary"

    return "normal"
})

const bootMessages = [
    "INITIALIZING...",
    "CONNECTING DATABASE...",
    "SCANNING DNA...",
    "MATCH FOUND...",
    "LOADING PROFILE..."
]

const visibleMessages = ref<string[]>([])

watch(
    () => props.pokemon,
    async (newPokemon) => {

        if (!newPokemon) return

        scanning.value = true
        visibleMessages.value = []

        for (const message of bootMessages) {

            visibleMessages.value.push(message)

            await new Promise(resolve =>
                setTimeout(resolve, 250)
            )

        }

        scanning.value = false

    }
)
</script>

<template>

    <div class="sidebar" :class="rarity" @click="pokemon && emit('open')">

        <!-- No Pokémon Selected -->
        <template v-if="!pokemon">

            <h2>POKÉDEX TERMINAL</h2>

            <div class="empty">

                CLICK A POKÉMON
                <br>
                TO START SCANNING

            </div>

        </template>

        <!-- Pokémon Selected -->
        <template v-else>

            <!-- Scanner Animation -->
            <div v-if="scanning" class="scanner">

                <h2>POKÉDEX</h2>

                <div class="scan-circle"></div>

                <div class="boot">

                    <p v-for="message in visibleMessages" :key="message" class="boot-line">
                        > {{ message }}
                    </p>

                </div>

            </div>

            <!-- Pokémon Information -->
            <template v-else>

                <h2>POKÉDEX</h2>

                <img :src="`https://play.pokemonshowdown.com/sprites/ani/${pokemon.name}.gif`" :alt="pokemon.name"
                    class="artwork">

                <h1>
                    {{ pokemon.name }}
                </h1>

                <p>
                    #{{ pokemon.id }}
                </p>

                <div class="types">

                    <TypeBadge v-for="type in pokemon.types" :key="type.slot" :type="type.type.name" />

                </div>

                <div class="terminal">

                    <p>> CONNECTION ESTABLISHED</p>

                    <p>> DNA VERIFIED</p>

                    <p>> SPECIES IDENTIFIED</p>

                    <p>> STATUS ONLINE</p>

                </div>

                <div class="stats">

                    <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat">

                        <div class="label">

                            <span>
                                {{ stat.stat.name.toUpperCase() }}
                            </span>

                            <span>
                                {{ stat.base_stat }}
                            </span>

                        </div>

                        <div class="bar">

                            <div class="fill" :style="{
                                width: `${Math.min(stat.base_stat, 100)}%`
                            }" />

                        </div>

                    </div>

                </div>

                <div class="system">

                    <h3>SYSTEM STATUS</h3>

                    <p>● ONLINE</p>

                    <p>● DATABASE CONNECTED</p>

                    <p>● SCANNER READY</p>

                </div>

                <div class="threat">

                    <h3>THREAT LEVEL</h3>

                    <span class="rank" :class="rarity">

                        {{
                            pokemon.is_mythical
                                ? "SS+"
                                : pokemon.is_legendary
                                    ? "S"
                                    : "B"
                        }}

                    </span>

                </div>

            </template>

        </template>

    </div>

</template>

<style scoped>
.sidebar {
    position: sticky;
    top: 90px;
    height: fit-content;
    background: #07131f;
    border: 1px solid cyan;
    border-radius: 20px;
    padding: 20px;
    color: white;
    box-shadow:
        0 0 20px cyan;
}

.artwork {
    width: 150px;
    display: block;
    margin: auto;
}

h1 {
    text-align: center;
    text-transform: capitalize;
}

h2 {
    text-align: center;
    color: #38bdf8;
    letter-spacing: 3px;
}

.types {
    display: flex;
    justify-content: center;
    gap: .5rem;
    margin: 15px 0;
}

.terminal {
    margin-top: 25px;
    font-family: monospace;
    color: #59f8ff;
}

.empty {
    text-align: center;
    margin-top: 80px;
    color: #38bdf8;
    line-height: 2;
}

.legendary {
    box-shadow:
        0 0 20px gold,
        0 0 50px orange;

}

.mythical {
    box-shadow:
        0 0 20px violet,
        0 0 60px cyan;
}

.stats {
    margin-top: 30px;
}

.stat {
    margin-bottom: 15px;
}

.label {
    display: flex;
    justify-content: space-between;
    font-size: .8rem;
    margin-bottom: 4px;
    color: #8be9fd;
}

.bar {
    height: 8px;
    background: #112233;
    border-radius: 999px;
    overflow: hidden;
}

.fill {
    height: 100%;
    background: linear-gradient(90deg,
            cyan,
            #38bdf8);

    box-shadow: 0 0 12px cyan;
    transition: width .8s ease;
}

.system {
    margin-top: 30px;
    border-top: 1px solid rgba(0, 255, 255, .3);
    padding-top: 20px;
    font-family: monospace;
    color: #38bdf8;
}

.system p {
    margin: 8px 0;
}

.threat {
    margin-top: 30px;
    text-align: center;
}

.rank {
    display: inline-block;
    margin-top: 10px;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 4px;
    color: cyan;
}

.scanner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
}

.boot {
    width: 100%;
    font-family: monospace;
    color: #38bdf8;
    line-height: 2;
}

.scan-circle {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 3px solid cyan;
    position: relative;
    overflow: hidden;
}

.scan-circle::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 5px;
    background: cyan;
    box-shadow: 0 0 20px cyan;
    animation: scan 1.2s linear infinite;
}

@keyframes scan {

    from {

        top: -10px;

    }

    to {

        top: 180px;

    }

}

@media (max-width: 700px) {

    .sidebar {
        display: none;
    }

    .dashboard {
        grid-template-columns: 1fr;
    }

}

.boot-line{

    opacity:0;

    animation:fadeIn .25s forwards;

}

@keyframes fadeIn{

    from{

        opacity:0;
        transform:translateY(6px);

    }

    to{

        opacity:1;
        transform:translateY(0);

    }

}
</style>