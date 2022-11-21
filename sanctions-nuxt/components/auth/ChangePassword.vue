<template>
    <div class="p-col-12">
        <div class="card card-container">
            <bg-home-button/>
            <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
            <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
                <div class="form-group">
                    <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Current password</label>
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
                    <label for="newpassword" :class="{'p-error':v$.newpassword.$invalid && submitted}">New password</label>
                    <Password id="newpassword" v-model="v$.newpassword.$model" :class="{'p-invalid': v$.newpassword.$invalid && submitted}" toggleMask>
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
                    <label for="newpasswordconfirmation" :class="{'p-error': v$.newpasswordconfirmation.$invalid && submitted || v$.newpassword.$model != v$.newpasswordconfirmation.$model}">New password (confirm)</label>
                    <Password id="newpasswordconfirmation" v-model="v$.newpasswordconfirmation.$model" :class="{'p-invalid':v$.newpasswordconfirmation.$invalid && submitted && v$.newpassword.$model != v$.newpasswordconfirmation.$model}" toggleMask>
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
                    <Button type="submit" label="Submit" class="mt-2" :disabled="loading" style="width: 100%;"> 
                        <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                        <span class="text-center" style="width: 100%;">Change</span>                    
                    </Button>
                </div>
                <div class="form-group pt-1 text-center"> 
                    <a href="/auth/register">New user</a>
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
import Divider from 'primevue/divider'
import { email, required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { onMounted, reactive, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import HomeButton from '@/components/core/HomeButton.vue'

export default {
  setup(){ 
    const state = reactive({
        login: '',
        password: '',
        newpassword: '',
        newpasswordconfirmation: '',
    })

    const rules = {
        login: { required, email },
        newpassword: { required },
        newpasswordconfirmation: { required },          
        password: { required } 
    }

    let v$ = useVuelidate(rules, state)

    const loading = ref(false)
    const message = ref('')    
    const submitted = ref(false)

    const router = useRouter()
    const { $changepassword, $auth, $toast } = useContext()
    
    onMounted(() => {
        if (!$auth.loggedIn) router.push('/auth/profile');
        state.login = $auth.user.login;
    });

    const handleSubmit = (isFormValid) => {
        if (!isFormValid) {
            loading.value = false;
            return;
        }

        submitted.value = true

        if (state.login && state.password) {
            loading.value = true            
            $changepassword(new User(state.login, null, state.newpassword), state.password).then(() => {
              $toast.success('Confirmation link is sent to your e-mail')
              loading.value = false
              router.push('/auth/passwordchanged');
            }, 
            error => {
              loading.value = false;
              message.value = (error.response && error.response?.data?.message) || error.response?.data?.status || error.message || error.toString();
              $toast.error(message.value)
            });
        }
    }

    return {v$, loading, message, handleSubmit, submitted}
  },
  components: { InputText, Password, Button, Divider, 'bg-home-button': HomeButton }, 
};
</script>