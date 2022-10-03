<template>
    <div class="p-col-12">
        <div class="card card-container">
            <bg-home-button/>
            <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
            <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
                <div class="form-group">
                    <label for="username" :class="{'p-error':v$.username.$invalid && loading}">Username</label>
                    <InputText type="text" id="username" v-model="v$.username.$model" :class="{'p-invalid':v$.username.$invalid && loading}"/>
                </div>
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
                <div class="form-group">
                    <label for="confirmation" :class="{'p-error':v$.confirmation.$invalid && submitted || v$.password.$model != v$.confirmation.$model }">Password confirmation</label>
                    <Password id="confirmation" v-model="v$.confirmation.$model" :class="{'p-invalid':v$.confirmation.$invalid && submitted || v$.password.$model != v$.confirmation.$model}" toggleMask>
                        <template #header>
                            <h6>Confirm a password</h6>
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
                    <Button type="submit" label="Submit" class="mt-2" :disabled="loading" style="width: 100%;"> 
                        <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                        <span>Register</span>                    
                    </Button>
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
import { email, required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { reactive, ref, onMounted } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import Divider from 'primevue/divider/Divider'
import HomeButton from '@/components/core/HomeButton.vue'

export default {
  setup() { 
    const state = reactive({
        login: '',
        password: '',
        confirmation: '',
        username: ''
    })

    const rules = {
        login: { required, email },
        password: { required },
        confirmation: { required },          
        username: { required } 
    }

    let v$ = useVuelidate(rules, state)

    const { $auth, $register, $toast } = useContext()
    const router = useRouter()
    const loading = ref(false)
    const submitted = ref(false)
    const message = ref('')    

    onMounted(() => {
      if ($auth.loggedIn) {
        router.push('/auth/profile')  
      }
    })    

    const handleSubmit = (isFormValid) => {
        loading.value = true

        if ( !isFormValid || password.value != confirmation.value ) {
            loading.value = false
            return
        }

        submitted.value = true         
        
        $register(new User(state.login, state.username, state.password)).then(
          user => {
            $auth.setUser(user)
            router.push('/auth/registered');    
        }, 
          error => {
            loading.value = false;
            message.value = (error.response && error.response.data.message) || error.response.data.status || error.message || error.toString();                  
            $toast.error(message.value)
        })            
    }
    
    return { state, v$, handleSubmit, loading, submitted, message }

  },
  components: { InputText, Password, Button, Divider, 'bg-home-button': HomeButton }, 
}
</script>