import { defineStore } from "pinia";

export const useOrganizationsStore = defineStore("organizations", {
    state: () => {
        return {
            organizations: []
        }
    },
    actions: {
        async setOrganizations(value){
            this.organizations = JSON.parse(JSON.stringify(value));
        }
    },
    getters: {
        getOrganizations: (state) => {
            state.organizations
        }
    }
}); 