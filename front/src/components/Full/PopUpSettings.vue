<script setup>

</script>

<template>
    <section>
        <div class="account">
            <p>Perfil</p>
            <font-awesome-icon :icon="['fas', 'user']" style="color: var(--lime-green);" size="xl"/>
        </div>

        <div class="favorites" @click="$emit('toggleFavorites')">
            <p>
                Favoritos
            </p>
            <font-awesome-icon :icon="['fas', 'heart']" style="color: var(--lime-green);" size="xl"/>
        </div>

        <div class="logout" @click="$emit('logout')">
            <p>
                Sair
            </p>
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"  size="xl"/>
        </div>
    </section>
</template>

<style scoped>
    section {
        position: fixed;
        right: 2%;
        top: 7%;
        padding: .5% 1%;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        z-index: 12;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        animation: popUp 0.5s forwards;
    }

    @keyframes popUp {
        0%  {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    section > div {
        display: flex;
        gap: 10px;
        font-size: 1.3rem;
        text-transform: uppercase;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }

    .favorites {
        position: relative;
        padding-bottom: 15px;
        border-bottom: 2px solid #000;
    }

    .logout {
        position: relative;
        top: -5px;
    }
</style>