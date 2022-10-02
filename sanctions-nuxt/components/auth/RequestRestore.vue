<template>
    <div class="p-col-12">
        <div class="card card-container">
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

export default {
  name: 'RequestRestore',
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

    const { $auth, $requestrestore } = useContext()
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
          //this.$toast.add({severity:'success', summary: 'Password restore', detail:'Link to restore password is sent to your e-mail', life: 3000});
          router.push('/auth/login');
        },
        error => {
          loading.value = false;
          message.value = (error.response && error.response.data.status) || error.message || error.toString();
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
  components: { InputText, Button }, 
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