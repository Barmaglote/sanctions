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
        async fetchOrganizations(){
            const { $fetchOrganizations } = useContext()
    		$fetchOrganizations().then(res => {
        	    this.setOrganizations(res.data)
    		}) 
        }
    },
    getters: {
        Organizations: (state) => {
            return state.organizations
        }        
    }
})
