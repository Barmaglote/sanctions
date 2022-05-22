import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", {
    state: () => {
        return {
            persons: []
        }
    },
    actions: {
        async setPersons(value){
            this.persons = JSON.parse(JSON.stringify(value));
        }
    },
    getters: {
        getPersons: (state) => {
            state.persons
        }
    }
}); 