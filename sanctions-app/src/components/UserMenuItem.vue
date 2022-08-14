<script setup>
  import SplitButton from 'primevue/splitbutton';
  import { useAuthStore } from './../stores/auth';
</script>

<template>
  <SplitButton icon="pi pi-user" class="mx-2 bg-primary border-round" :model="loginItems" @click="goToProfile"></SplitButton>  
</template>

<script>
export default {
  name: "UserMenuUtem",
  components: { SplitButton },
  created() {
    this.authStore = useAuthStore();
  },    
  methods: {
    goToProfile(){
      this.$router.push('/profile');
    }
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
      let items = [
				{
					label: this.loggedIn ? this.currentUser.username : 'Anonymous',
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
				}, 
				{
					label:  'Register',
					icon: 'pi pi-user-plus',
					command: () => {
            if (this.loggedIn) {
              this.authStore.logout();              
            };
            this.$router.push('/register');
					}
				}     
			];

      if (this.loggedIn) { 
        items.push(
				{
					label:  'Change password',
					icon: 'pi pi-user-edit',
					command: () => {
            this.$router.push('/changepassword');
					}
				});    
      }

      return items;
     }
  }
}
</script>

