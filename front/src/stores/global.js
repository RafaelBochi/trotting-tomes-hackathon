import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        messageModel: {
            text: "",
            type: "",
            show: false,
        },
        showPreloader: false,
    }),
    actions: {
        showMessageModal(text, type) {
            this.messageModel.text = text;
            this.messageModel.type = type;
            this.messageModel.show = true;
            setTimeout(() => {
                this.messageModel.show = false;
            }, 4500);
        }
    }
});