<script setup>

</script>

<template>
    <header>
        <div class="logo">
            <img src="/logo-principal-green.png" alt="">
        </div>

        <div class="actions">
            <div class="links">
                <router-link to="/">
                    <a href="">
                        <p>
                            Home
                        </p>
                    </a>
                </router-link>
                <router-link to="/products">
                    <a href="">
                        <p>
                            Produtos
                        </p>
                    </a>
                </router-link>
                <router-link to="/sobre">
                    <a href="">
                        <p>
                            Sobre
                        </p>
                    </a>
                </router-link>
        </div>

        <div class="search">
            <input type="text" placeholder="Busque aqui seu produto...">
        </div>

        <div class="auth">
            <router-link to="/login">
                <button>
                <font-awesome-icon :icon="['fas', 'user']" size="xl" style="color: #fff;" />
                
                <p>
                    Registrar-se
                </p>
                </button>
            </router-link>
            
        </div>
        </div>

        
    </header>
</template>

<style scoped>
    header {
        background-color: #fff;
        width: 100%;
        height: 8%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 1px 20px -9px rgba(52,71,52,1);
        position: sticky;
        top: 0;
        z-index: 9;
    }

    .logo {
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 6%;
    }

    .logo img{
        width: 100%;
    }

    .actions {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .links {
        position: relative;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .links a {
        color: var(--secondary-color);
        text-decoration: none;
        font-size: 1.7rem;
        font-weight: bolder;
        transition: all .2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    a.router-link-active p {
        color: var(--primary-color);

    }

    a.router-link-active::after {
        content: '';
        width: 120%;
        height: 3px;
        background: var(--primary-color);
    }

    .search input {
        outline: none;
        border-radius: 10px;
        border: none;
        box-shadow: var(--primary-color) 0px 0px 5px;
        padding: 2%;
        padding-left: 3%;
        width: 300px;
        height: 32px;
    }

    .auth {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .auth button {
        border: none;
        background-color: var(--primary-color);
        color: var(--white);
        width: 150px;
        padding: 0.7rem 2rem;
        border-radius: 10px;
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .auth button p {
        font-size: 1.2rem;
        font-weight: bolder;
        text-align: center;
    }

</style>
