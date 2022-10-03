<template>
  <div class="card card-container">
    <bg-home-button/>
    <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
    You account has been registred. Please confirm your email and sign in. 
    <div class="mt-3 text-center">    
      <Button label="Sign in" icon="pi pi-sign-out" iconPos="right" @click="login"></Button>
    </div>    
  </div>
</template>

<script>
import Button from 'primevue/button'
import { onMounted, useContext, useRouter } from '@nuxtjs/composition-api'
import HomeButton from '@/components/core/HomeButton.vue'

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
  components: { Button, 'bg-home-button': HomeButton },
};
</script>