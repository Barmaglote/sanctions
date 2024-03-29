import { defineStore } from "pinia";

export const useLinksStore = defineStore("links", {
    state: () => {
        return {
            links: []
        }
    },
    actions: {
        async setLinks(value){
            this.links = JSON.parse(JSON.stringify(value));
        },
    },
    getters: {
        Links: (state) => {
            return state.links
        },
    }
}); 
