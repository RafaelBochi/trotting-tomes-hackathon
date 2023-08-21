<script setup>

</script>

<template>
    <section>
        <aside>
            <div class="links">
                <span class="editAccount">
                    <p>
                        Editar Conta
                    </p>
                    <font-awesome-icon :icon="['fas', 'user']" size="lg" />
                </span>

                <span class="settings">
                    <p>
                        Configurações
                    </p>
                    <font-awesome-icon :icon="['fas', 'gear']" size="lg" />
                </span>

                <i class="bar"></i>

                <span class="exit">
                    <p>
                        Sair
                    </p>
                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="lg" />
                </span>
            </div>
        </aside>

        <div class="contentEditAccount">
            <h2>Edite Sua Conta</h2>
            <div class="form">
                <img src="/userIcon.png" alt="">

                <div class="inputs">
                    <div class="inputName">
                        <input type="text" required>
                        <label>Nome de Usuario</label>
                    </div>

                    <div class="inputEmail">
                        <input type="email" required>
                        <label>Email</label>
                    </div>

                    <div class="inputPassword">
                        <input type="password" required>
                        <label>Senha</label>
                    </div>

                    <div class="inputPasswordConfirm">
                        <input type="password" required>
                        <label>Confirmar Senha</label>
                    </div>
                </div>


            </div>
            <div class="actions">
                <button class="confirm">
                    Confirmar
                </button>
                <button class="cancel">
                    Cancelar
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;

}

aside {
    position: relative;
    width: 300px;
    height: 100%;
    border-right: 5px solid var(--lime-green);
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
}

aside .links {
    display: flex;
    flex-direction: column;
    gap: 80px;
    font-size: 2.0rem;
    width: 95%;
}

aside .links span {
    display: flex;
    gap: 10px;
    background-color: var(--lime-green);
    padding: 10px 20px;
    align-items: center;
    justify-content: center;
    border-radius: 10px 0px 0px 10px;
    cursor: pointer;
}

aside .links .exit {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: transparent;
}

aside .links .bar {
    width: 300px;
    height: 2px;
    background-color: var(--lime-green);
    position: absolute;
    bottom: 60px;
    left: 0;
}

.contentEditAccount {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: calc(100% - 300px);
    gap: 50px;
}

.contentEditAccount h2 {
    font-size: 2.5rem;
    font-weight: bolder;
    color: var(--lime-green);
    margin-bottom: 30px;
}

.contentEditAccount .form {
    display: flex;
    align-items: center;
    gap: 100px;
}

.contentEditAccount .form img {
    width: 200px;
}

.contentEditAccount .form .inputs {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
}

.contentEditAccount .form .inputs > div {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--cinza);
    border-radius: 10px;
}

.contentEditAccount .form .inputs input {
    width: 300px;
    height: 40px;
    outline: none;
    border: none;
    padding: 0px 15px;
    font-size: 1.5rem;
    font-weight: bolder;
    background-color: transparent;
    z-index: 2;
}

.contentEditAccount .form .inputs > div label {
    position: absolute;
    left: 15px;
    font-size: 1.5rem;
    z-index: 1;
    transition: all .5s ease;
}

.contentEditAccount .form .inputs input:focus + label, .contentEditAccount .form .inputs input:valid + label {
    top: -20px;
}

.contentEditAccount .actions {
    display: flex;
    gap: 50px;
}

.contentEditAccount .actions button {
    width: 200px;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bolder;
    cursor: pointer;
}

.contentEditAccount .actions .confirm {
    background-color: var(--success-color);
    color: #fff;
}

.contentEditAccount .actions .cancel {
    border: var(--error-color) 2px solid;
    color: var(--error-color);
    background-color: #fff;
}
</style>