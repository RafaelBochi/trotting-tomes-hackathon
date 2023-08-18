<script setup>
import FormLoginComponent from './FormLoginComponent.vue';
</script>


<template>
    <main>
        <img class="logo" src="/logo-principal-green.png" alt="">

        <div class="banner">
            <span class="title">
                <h1>
                    VOCÊ VOLTOU!
                </h1>
                <h3>
                    Ficamos felizes em te ver novamente
                </h3>
            </span>

            <img src="/horseandbook.png" alt="">
        </div>

        <FormLoginComponent class="form" />

        <span class="changeToLogin">
            <p>
                Não possui uma conta?
            </p>
            <p @click="$emit('changeAuth')">
                Crie agora!
            </p>
        </span>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    background-color: #fff;
    animation: main 1s ease forwards;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

@keyframes main {
    from {
        opacity: 0.3;
    }

    to {
        opacity: 1;
    }
}

.logo {
    width: 150px;
    position: absolute;
    left: 0;
    top: 0;
}

.banner {
    position: relative;
    left: 60%;
    padding-left: 3%;
    background-color: var(--lime-green);
    width: 40%;
    height: 110%;
    border-radius: 9% 0% 0% 9% / 50% 50% 50% 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
    animation: banner 1s ease forwards;
}

@keyframes banner {
    0% {
        left: 0%;
        width: 100%;
        border-radius: 0% 0% 0% 0% / 50% 50% 50% 50%;
        background: var(--primary-color);
    }

    100% {
        left: 60%;
        border-radius: 9% 0% 0% 9% / 50% 50% 50% 50%;
        background: var(--lime-green);
        align-items: center;
    }
}

.banner>img {
    width: 90%;
    position: relative;
    animation: horse .5s ease forwards;
}

@keyframes horse {
    0% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(0deg);
    }
}

.title {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    gap: 10px;
    font-size: 1.8rem;
}

.title h3 {
    letter-spacing: 0.1rem;
    font-weight: 500;
}

.changeToLogin {
    position: absolute;
    left: 0%;
    bottom: 0%;
    display: flex;
    gap: 5px;
    padding: 0.5%;
    font-size: 1.6rem;
}


.changeToLogin p:nth-child(2) {
    cursor: pointer;
    text-decoration: underline;
    color: var(--lime-green);
    font-weight: 700;
}

.form,
.changeToLogin,
.logo {
    animation: form 1.5s ease forwards;
}

@keyframes form {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}

@media screen and (max-width: 1000px) {
    .banner {
        display: none;
    }

    .form {
        width: 90%;
        left: 5%;
    }

    .changeToLogin {
        left: 2%;
        bottom: 2%;
    }
}</style>