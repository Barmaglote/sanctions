<template>
    <div class="p-col-12">
        <div class="card card-container">
          <bg-home-button/>
          <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
          <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
              <div class="form-group">
                  <label for="login" :class="{'p-error':v$.login.$invalid && loading}">Login (e-mail)</label>
                  <InputText type="text" id="login" v-model="v$.login.$model" :class="{'p-invalid':v$.login.$invalid && loading}"/>
              </div>
              <div class="form-group pt-3"> 
                  <Button type="submit" label="Submit" class="mt-2" :disabled="loading" style="width: 100%;"> 
                      <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                      <span class="text-center" style="width: 100%;">Restore</span>                    
                  </Button>
              </div>
              <div class="form-group pt-1 text-center"> 
                  <a href="/auth/login" class="px-1">Sign in</a>
                  <a href="/auth/register" class="px-1">New user</a>
              </div>                
              <div class="form-group">
                  <div v-if="message" class="alert alert-danger pt-2" role="alert">Status: {{message}}</div>
              </div>
          </form>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { email, required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { reactive, ref, onMounted } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import HomeButton from '@/components/core/HomeButton.vue'

export default {
  setup() { 
    const state = reactive({
      login: ''
    })

    const rules = {
      login: {
        required,
        email
      }
    }

    let v$ = useVuelidate(rules, state)    

    const { $auth, $requestrestore, $toast } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const message = ref('')

    const handleSubmit = (isFormValid) => {
      loading.value = true;

      if (!isFormValid) {
        loading.value = false;
        return;
      }
      
      if (state.login) {
        $requestrestore(state.login).then(() => {
          loading.value = false;
          $toast.success('Link to restore password is sent to your e-mail')
          router.push('/auth/login');
        },
        error => {
          loading.value = false;
          message.value = (error.response && error.response.data.status) || error.message || error.toString();
          $toast.error(message.value)
        });
      }
    }

    onMounted(() => {
      if ($auth.loggedIn) {
        router.push('/auth/profile')  
      }
    })    
  
    return {
      handleSubmit, loading, message, v$
    }
  },
  components: { InputText, Button, 'bg-home-button': HomeButton }, 
};
</script>