import { defineStore } from "pinia";
import { useContext } from '@nuxtjs/composition-api'

export const useProfileStore = defineStore("profile", {
    state: () => {
        return {
            profile: {
                info: null,
                nickname: null,
                _id: null,
                login: null
            }
        }
    },
    actions: {
        async setProfile(value){
            if (value?.profile) { 
                this.profile = JSON.parse(JSON.stringify(value.profile));
            }             
        },

        async fetchPublicProfile(){
            const { $fetchPublicProfile } = useContext()
    		$fetchPublicProfile().then(res => {
        	    this.setProfile(res.data);
    		}) 
        },

        async fetchPrivateProfile(){
            const { $fetchPrivateProfile } = useContext()
    		$fetchPrivateProfile().then(res => {
        	    this.setProfile(res.data);
    		}) 
        }, 
        async updateProfile(profile){
            const { $updateProfile } = useContext()
    		$updateProfile().then(res => {
        	    this.setProfile(res.data);
    		})
        },         
        async createProfile(nickname, ctx){
            const { $createProfile } = ctx;
    		await $createProfile(nickname).then(res => {
        	    this.setProfile(res.data);
    		})            
        } 
    },
    getters: {
        Profile: (state) => {
            return state.profile
        }
    }
}); 
