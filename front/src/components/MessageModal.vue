<script setup>
import { useGlobalStore } from '@/stores/global';
import { computed, onMounted, ref } from 'vue';

const globalStore = useGlobalStore();

const messageModal = ref(globalStore.messageModel);

onMounted(() => {
    setTimeout(() => {
        messageModal.value.show = false;
    }, 4000);
});
</script>

<template>
    <span class="message" :class="messageModal.type == 'success' ? 'success' : messageModal.type == 'error' ? 'error' : ''" v-if="messageModal.show">
        <p class="text">
            {{ messageModal.text  }}
        </p>
        <span class="close" @click="messageModal.show = false">
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
        width: 250px;
        height: 35px;
        background-color: #ffffff77;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        font-size: 1.3rem;
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
        animation: timeClose 4s infinite;
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