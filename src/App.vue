<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
    <header class="navbar">

        <h2>Pokemon</h2>

        <nav>
            <RouterLink to="/">Home</RouterLink>

            <RouterLink to="/dashboard">
                Dashboard
            </RouterLink>

            <RouterLink to="/minigame">
                Minigame
            </RouterLink>
        </nav>

    </header>

    <RouterView />
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem 2rem;

    background: #0f172a;

    border-bottom: 1px solid #38bdf8;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 2rem;
}

nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

nav a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: .25s;
}

nav a:hover {
    color: #38bdf8;

    border-color: #38bdf8;

    box-shadow:
        0 0 8px #38bdf8,
        0 0 18px #38bdf8;

    background: rgba(56,189,248,.08);

    transform: translateY(-2px);
}

</style>