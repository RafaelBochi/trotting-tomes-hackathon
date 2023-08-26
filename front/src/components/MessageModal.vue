<script setup>
import { useGlobalStore } from '@/stores/global';
import { set } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

const globalStore = useGlobalStore();

const messageModal = ref(globalStore.messageModel);
const closeModal = ref(false);

function close() {
    closeModal.value = true;
    setTimeout(() => {
        messageModal.value.show = false;
    }, 500);
}

onMounted(() => {
    close()
});
</script>

<template>
    <span class="message" :class="{ 
          closeModal: closeModal, 
          success: messageModal.type === 'success', 
          error: messageModal.type === 'error' 
      }" v-if="messageModal.show">
        <p class="text">
            {{ messageModal.text  }}
        </p>
        <span class="close" @click="close">
            <font-awesome-icon :icon="['fas', 'xmark']" size="lg"/>
        </span>
        <i class="time"></i>
    </span>
</template>

<style scoped>
    .message {
        position: fixed;
        top: 10vh;
        right: 0;
        width: 280px;
        height: 35px;
        background-color: #ffffff77;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        font-size: 1.3rem;
    }

    .closeModal {
        animation: close .5s 3.5s ease-in-out forwards;
    }

    @keyframes close {
        0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(-10px);
        }
        100% {
            transform: translateX(300px);
        }
    }

    .text {
        color: white;
        height: 100%;
        text-align: center;
        width: 85%;
        text-align: start;
        display: flex;
        align-items: center;
        padding: 4%;
        border-radius: 5px 0px 0px 5px;
    }

    .close {
        color: white;
        height: 100%;
        width: 14%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 4%;
        cursor: pointer;
    }

    .time {
        position: absolute;
        bottom: 0;
        width: 85%;
        height: 3px;
        background-color: #fff;
        animation: timeClose 3.5s forwards;
    }

    @keyframes timeClose {
        0% {
            width: 0%;
        }

        100% {
            width: 85%;
        }
    }

    .success .text, .success .close {
        background-color: var(--success-color);
    }

    .error .text, .error .close {
        background-color: var(--error-color);
    }
</style>