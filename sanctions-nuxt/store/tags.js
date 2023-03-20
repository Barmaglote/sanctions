import { defineStore } from "pinia"

export const useTagsStore = defineStore("tags", {
    state: () => {
        return {
            tags: [],
            selected: [],
        }
    },
    actions: {
        async setTags(value){
            this.tags = JSON.parse(JSON.stringify(value))
        },
        async addSelectedTag(value){
            if (this.selected.some(x => x.key == value.key)) return;
            this.selected.push(JSON.parse(JSON.stringify(value)))
        },
        async deleteSelectedTag(value){
            if (!this.selected.some(x => x.key == value.key)) return;
            this.selected = this.selected.filter(x => x.key != value.key)
        },
    },
    getters: {
        Tags: (state) => {
            return state.tags
        },
        Selected: (state) => {
            return state.selected
        }
    },
})
