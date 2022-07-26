<script setup>
  import SplitButton from 'primevue/splitbutton';
  import { useAuthStore } from './../stores/auth';
</script>

<template>
  <SplitButton icon="pi pi-user" class="mx-2 bg-primary border-round" :model="loginItems"></SplitButton>  
</template>

<script>
export default {
  name: "UserMenuUtem",
  components: { SplitButton },
  created() {
    this.authStore = useAuthStore();
  },    
  data() {
    return {
        authStore: null
        }
    },    
  computed: {
    loggedIn() {
       return this.authStore.state.status.loggedIn;
    },    
    currentUser() {      
      return this.authStore.state.user;
    },    
    loginItems(){
      return [
				{
					label: this.loggedIn ? this.currentUser.login : 'Anonymous',
					icon: 'pi pi-user',
					command: () => {
						this.$router.push('/profile')
					}
				},
				{
					label:  this.loggedIn ? 'Sign out' : 'Sign in',
					icon: this.loggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in',
					command: () => {
            if (this.loggedIn) {
              this.authStore.logout();
              
            };
            this.$router.push('/login');
					}
				}
			]      
     }
  }
}
</script>

