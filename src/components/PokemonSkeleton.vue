<template>
    <div class="skeleton-card">
        <div class="skeleton-image"></div>

        <div class="skeleton-title"></div>

        <div class="skeleton-types">
            <div class="skeleton-type"></div>
            <div class="skeleton-type"></div>
        </div>
    </div>
</template>

<style scoped>
.skeleton-card {
    padding: 1.5rem;

    border-radius: 16px;

    background: #0f172a;

    border: 1px solid #334155;
}

.skeleton-image {
    width: 150px;
    height: 150px;

    margin: auto;

    border-radius: 50%;
}

.skeleton-title {
    width: 70%;
    height: 20px;

    margin: 1rem auto;
}

.skeleton-types {
    display: flex;
    justify-content: center;
    gap: .5rem;
}

.skeleton-type {
    width: 70px;
    height: 24px;

    border-radius: 999px;
}

.skeleton-image,
.skeleton-title,
.skeleton-type {
    background: linear-gradient(
        90deg,
        #1e293b 25%,
        #334155 50%,
        #1e293b 75%
    );

    background-size: 200% 100%;

    animation: shimmer 1.4s infinite;
}

@keyframes shimmer {

    from {
        background-position: 200% 0;
    }

    to {
        background-position: -200% 0;
    }
}
</style>