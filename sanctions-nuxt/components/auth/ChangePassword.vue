<template>
    <div class="p-col-12">
        <div class="card card-container">
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
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import User from '@/models/user';
import Divider from 'primevue/divider';
import { email, required } from 'vuelidate/lib/validators';
import { useVuelidate } from "@vuelidate/core";
import { onMounted, reactive, ref } from 'vue';
import { useContext, useRouter } from '@nuxtjs/composition-api'

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
    const { $changepassword, $auth } = useContext() // TODO
    
    onMounted(() => {
        if (!$auth.loggedIn) router.push('/auth/profile');
        state.login = $auth.user.login;
    });

    const handleSubmit = (isFormValid) => {

        console.log("111111111111")

        if (!isFormValid) {
            loading.value = false;
            return;
        }

        console.log("222222222222")

        submitted.value = true

        console.log("333333333333")

        if (state.login && state.password) {

            console.log("4444444444444444")

            loading.value = true            
            $changepassword(new User(state.login, null, state.newpassword), state.password).then(() => {
              //this.$toast.add({severity:'success', summary: 'Password change', detail:'Confirmation link is sent to your e-mail', life: 3000});
              loading.value = false
              console.log("555555555555")
              router.push('/auth/passwordchanged');
            }, 
            error => {
              console.log("666666666666")
              console.log(error)
              loading.value = false;
              message.value = (error.response && error.response?.data?.message) || error.response?.data?.status || error.message || error.toString();
              console.log("7777777")
            });
        }
    }

    return {v$, loading, message, handleSubmit, submitted}
  },
  components: { InputText, Password, Button, Divider }, 
};
</script>

<style>
.p-inputtext, .p-password, .p-password-input {
    width: 100%;
}
label {
  display: block;
  margin-top: 10px;
}
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