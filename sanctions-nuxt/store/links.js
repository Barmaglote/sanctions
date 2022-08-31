import { defineStore } from "pinia";
import { useContext } from '@nuxtjs/composition-api'

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
        async fetchLinks(){
            const { $fetchLinks } = useContext()
    		$fetchLinks().then(res => {
        	    this.setLinks(res.data);
    		}) 
        }
    },
    getters: {
        getLinks: (state) => {
            return state.links
        },
        getCharity: (state) => {
            return state.links.filter(x => x.type == 'charity');
        }        
    }
}); 
