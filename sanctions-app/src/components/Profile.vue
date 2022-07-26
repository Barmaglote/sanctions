<template>
  <div class="card card-container">
    You have logged in as <strong>{{currentUser?.login}}</strong>
    <div class="mt-3">    
      <Button label="Logout" icon="pi pi-sign-out" iconPos="right" @click="logout"></Button>
    </div>    
  </div>
</template>

<script>
import { useAuthStore } from './../stores/auth';
import Button from 'primevue/button';

export default {
  name: 'Profile',
  components: { Button }, 
  data() {
    return {
        authStore: null
        };
    },  
  created() {
    this.authStore = useAuthStore();
  },  
  computed: {
    currentUser() {      
      return this.authStore.state.user;
    }
  },
  mounted() {    
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods:{
    logout() {
      this.authStore.logout();
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>

