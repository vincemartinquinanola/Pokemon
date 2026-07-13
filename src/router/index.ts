import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import DashboardView from "@/views/DashBoard.vue"
import MiniGameView from "@/views/MiniGame.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
        },
        {
            path: "/minigame",
            name: "minigame",
            component: MiniGameView,
        },
    ],
})

export default router