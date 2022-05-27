import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
    state: () => {
        return {
            menu: []
        }
    },
    actions: {
        async setMenu(value){
            this.menu = JSON.parse(JSON.stringify(value));
        }
    },
    getters: {
        getMenu: (state) => {
            state.menu
        }
    }
}); 