import { defineStore } from "pinia"
import { useContext } from '@nuxtjs/composition-api'

export const usePersonsStore = defineStore("persons", {
    state: () => {
        return {
            persons: []
        }
    },
    actions: {
        async setPersons(value){
            this.persons = JSON.parse(JSON.stringify(value));
        },
        async fetch(){
            const { $fetchPersons } = useContext()
    		$fetchPersons().then(res => {
        	    this.setPersons(res.data)
    		}) 
        }
    },
    getters: {
        Persons: (state) => {
            return state.persons
        },
        Filtered: (state) => (search, tags) => {
            if (!search && tags.length == 0) {
              return state.persons;
            };
        
            let filtered = JSON.parse(JSON.stringify(state.persons));
                
            if (search) {
                let filterVal = search.trim().toLowerCase().split(/\s+/)
                let filterBy = [ 'titlerus', 'titleeng' ]			
                filtered = filtered.filter(item => filterBy.some(prop => filterVal.some(val => item[prop].toLowerCase().includes(val))));
            }
            
            if (tags.length > 0) {
                filtered = filtered.filter(x => x.tag.some(tag => tags.some(sel => sel.key == tag)));
            }
        
            return filtered
        }            
    }
})
