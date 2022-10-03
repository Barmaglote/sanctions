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
                <div class="form-group">
                    <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password</label>
                    <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                        <template #header>
                            <h6>Pick a password</h6>
                        </template>
                        <template #footer="sp">
                            {{sp.level}}
                            <Divider />
                            <p class="mt-2">Suggestions</p>
                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                              <li>At least one lowercase</li>
                              <li>At least one uppercase</li>
                              <li>At least one numeric</li>
                              <li>Minimum 8 characters</li>
                            </ul>
                        </template>
                    </Password>
                </div>
                <div class="form-group pt-3"> 
                    <Button type="submit" 
                            label="Submit" 
                            class="mt-2 g-recaptcha" 
                            :disabled="loading" 
                            style="width: 100%;"> 
                      <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                      <span class="text-center" style="width: 100%;">Sign Up</span>                    
                    </Button>
                </div>
                <div class="form-group pt-1 text-center"> 
                    <a href="/auth/register" :to="{ path: '/auth/register' }" class="px-1">New user</a>
                    <a href="/auth/requestrestore" :to="{ path: '/auth/restore' }" class="px-1">Forgot password</a>
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
import Password from 'primevue/password'
import User from '@/models/user'
import Divider from 'primevue/divider/Divider'
import { email, required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import HomeButton from '@/components/core/HomeButton'

export default {
  setup() {
    const state = reactive({
        login: '',
        password: ''
    })

    const rules = {
      login: {
        required,
        email
      },
      password: {
        required
      }      
    }

    let v$ = useVuelidate(rules, state)

    const { $auth, $login, $updateLocalToken, $toast, $recaptcha } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const submitted = ref(false)
    const message = ref('')

    const handleSubmit = async (isFormValid) => {
      loading.value = true;

      if (!isFormValid) {
        loading.value = false;
        return;
      }      

      if (state.login && state.password) {
        submitted.value = true;

        const recaptcha = await $recaptcha.execute('login')

        $login(new User(state.login, null, state.password, recaptcha)).then((result) => {
          loading.value = false;

          if (result) {
            $updateLocalToken(result.data?.accessToken, result.data?.refreshToken)
            router.push('/auth/profile');
          }          
        }, (error) => {          
          loading.value = false;
          message.value = (error.response && error.response?.data?.message) || error.response?.data?.status || error.message || error.toString();
          $toast.error(message.value)
        })
      }
    }

    onMounted(() => {
      if ($auth.loggedIn) {
        router.push('/auth/profile')  
      }

      try {
        $recaptcha.init()
      } catch (e) {
        console.error(e);
      }
    })

    onBeforeUnmount(() => {
      $recaptcha.destroy()
    })

    return { state, v$, loading, loading, message, handleSubmit, submitted }
  },
  components: { InputText, Password, Button, Divider, 'bg-home-button': HomeButton }
}
</script> 