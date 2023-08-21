<script setup>
import FormRegisterComponent from './FormRegisterComponent.vue'
</script>

<template>
    <main>
        <img class="logo" src="/logo-principal-green.png" alt="Logo">

        <div class="banner">
            <span class="title">
                <h1>
                    BEM-VINDO
                </h1>
                <h3>
                    Registre-se e faça parte da nossa equipe!
                </h3>
            </span>

            <img src="/horseandbook.png" alt="">
        </div>

        <FormRegisterComponent class="form" />

        <span class="changeToLogin">
            <p>
                Já possui uma conta?
            </p>
            <p @click="$emit('changeAuth')">
                Faça login
            </p>
        </span>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    background-color: var(--white);
    animation: main 1s ease forwards;
    overflow: hidden;
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
    right: 0;
    top: 0;
}

.banner {
    position: relative;
    right: 0%;
    padding-right: 6%;
    background-color: var(--primary-color);
    width: 40%;
    height: 110%;
    border-radius: 9% 0% 0% 9% / 50% 50% 50% 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 30px;
    animation: banner 1s ease forwards;
}

@keyframes banner {
    0% {
        left: 0%;
        width: 100%;
        border-radius: 0% 0% 0% 0% / 50% 50% 50% 50%;
        background: var(--lime-green);
    }

    100% {
        left: 0%;
        border-radius: 0% 9% 9% 0% / 50% 50% 50% 50%;
        background: var(--primary-color);
    }
}

.banner>img {
    width: 80%;
    position: relative;
    right: 5%;
    animation: horse .5s ease forwards;
}

@keyframes horse {
    0% {
        transform: rotateY(0deg);
    }

    100% {
        transform: rotateY(180deg);
    }
}

.title {
    display: flex;
    flex-direction: column;
    top: 20%;
    left: 15%;
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
    right: 0%;
    bottom: 0%;
    display: flex;
    gap: 5px;
    padding: 0.5%;
    font-size: 1.6rem;
}

.changeToLogin p:nth-child(2) {
    cursor: pointer;
    text-decoration: underline;
    color: var(--primary-color);
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
        transform: translateX(100%);
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