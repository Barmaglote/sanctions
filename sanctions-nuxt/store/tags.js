import { defineStore } from "pinia"
import { useContext } from '@nuxtjs/composition-api'

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
        async fetchTags(entity){
            const { $fetchTags } = useContext()
    		$fetchTags(entity).then(res => {
        	    this.setTags(res.data);
    		}) 
        }
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
