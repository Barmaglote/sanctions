<template>
  <div class="card card-container">
    <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
    You account has been registred. Please confirm your email and sign in. 
    <div class="mt-3 text-center">    
      <Button label="Sign in" icon="pi pi-sign-out" iconPos="right" @click="login"></Button>
    </div>    
  </div>
</template>

<script>
import Button from 'primevue/button';
import { onMounted, useContext, useRouter } from '@nuxtjs/composition-api';

export default {
  setup(){
    const router = useRouter()
    const { $auth } = useContext()

    onMounted(() => {
      if ($auth.loggedIn) {
        router.push('/auth/profile')
      }
    })

    const login = () => {
      $auth.logout('local');
      router.push('/auth/profile') 
    }

    return { login }
  },
  components: { Button },
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
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

</style>

