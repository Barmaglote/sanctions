import { defineStore } from "pinia"
import { useContext } from '@nuxtjs/composition-api'

export const useOrganizationsStore = defineStore("organizations", {
    state: () => {
        return {
            organizations: []
        }
    },
    actions: {
        async setOrganizations(value){
            this.organizations = JSON.parse(JSON.stringify(value))
        },
        async fetch(){
            const { $fetchOrganizations } = useContext()
    		$fetchOrganizations().then(res => {
        	    this.setOrganizations(res.data)
    		}) 
        }
    },
    getters: {
        Organizations: (state) => {
            return state.organizations
        },
        Filtered: (state) => (search, tags) => {
            if (!search && tags.length == 0) {
              return state.organizations;
            };
        
            let filtered = JSON.parse(JSON.stringify(state.organizations));
                
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
