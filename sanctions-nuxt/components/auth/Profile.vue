<template>
  <div class="card card-container">
    <bg-home-button/>
    <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
    You have logged in as <strong style="font-weight: 700;">{{$auth.user?.username}}</strong>
    <div class="mt-3 text-center">    
      <Button label="Logout" icon="pi pi-sign-out" iconPos="right" @click="logout"></Button>
    </div>    
  </div>
</template>

<script>
import Button from 'primevue/button'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import { onMounted } from 'vue'
import HomeButton from '@/components/core/HomeButton.vue'

export default {
  setup() {
    const router = useRouter()
    const { $auth, $logout } = useContext()

    onMounted(() => {    
      if (!$auth.user || !$auth.loggedIn) {
       router.push('/auth/login');
      }
    })

    const logout = () => {
      $logout();
    }

    return { logout }
  },
  components: { Button, 'bg-home-button': HomeButton }
}
</script>
