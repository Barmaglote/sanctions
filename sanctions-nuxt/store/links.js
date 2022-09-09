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
        Links: (state) => {
            return state.links
        },
        Filtered: (state) => (type, search) => {
			if (!state.links) return [];

	        if (!search) {	
        	  	return state.links.filter(x => x.type == type);
        	};

        	let filtered = JSON.parse(JSON.stringify(state.links)).filter(x => x.type == type);
            let filterVal = search.trim().toLowerCase().split(/\s+/)
        	let filterBy = [ 'titlerus', 'titleeng' ]			
            return filtered.filter(item => filterBy.some(prop => filterVal.some(val => item[prop].toLowerCase().includes(val))));
        }
    }
}); 
