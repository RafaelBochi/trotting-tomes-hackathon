<script setup>

</script>

<template>
    <footer>
        <h2>
            Trotting Tomes
        </h2>

        <div class="info">
            <p>
                <strong>Endereço:</strong> Rua dos Cavalos, 0 - São Paulo, SP
            </p>
            <p>
                <strong>Telefone:</strong> (11) 99999-9999
            </p>
            <p>
                <strong>Email:</strong> trottingtomes@gmail.com
            </p>
        </div>

        <div class="socialMedia">
            <h4>
                Redes Sociais
            </h4>

            <p>
                Nos acompanhe nas redes sociais
            </p>

            <div class="icons">
                <font-awesome-icon :icon="['fab', 'facebook']" size="2xl" style="color: var(--primary-color);" class="icon"/>

                <font-awesome-icon :icon="['fab', 'instagram']" size="2xl" style="color: var(--primary-color);" class="icon"/>
            </div>
            
        </div>

        <div class="copyright">
            <p>
                © 2023 Trotting Tomes. Todos os direitos reservados.
            </p>
        </div>
    </footer>
</template>

<style scoped>

footer {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
    box-shadow: 0 0 10px var(--primary-color-50);
    margin-top: 50px;
    padding: 2% 5%;
    gap: 10px;
    flex-wrap: wrap;
}

h2 {
    color: var(--primary-color);
    font-size: 1.8rem;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 60px;
    color: #666;
}

.socialMedia {
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 60px;
    color: #666;
}

.socialMedia h4 {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color);
}

.socialMedia .icons{
    display: flex;
    gap: 10px;
}

.socialMedia .icons .icon {
    font-size: 30px;
}

.copyright {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1% 5%;
    font-size: 1.2rem;
    color: #666;
    background-color: #eeeeee9a;
}
</style>