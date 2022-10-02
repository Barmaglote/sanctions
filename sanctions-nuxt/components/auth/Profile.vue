<template>
  <div class="card card-container">
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
  components: { Button }
}
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

