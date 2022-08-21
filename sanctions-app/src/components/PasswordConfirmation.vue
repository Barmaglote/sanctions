<template>
    <div class="p-col-12">
        <div class="card card-container">
            <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
            <form name="form" @submit.prevent="handleLogin(!v$.$invalid)">
                <input type="hidden" v-model="token">
                <div class="form-group">
                    <label for="login" :class="{'p-error':v$.login.$invalid && loading}">Login (e-mail)</label>
                    <InputText type="text" id="login" v-model="v$.login.$model" :class="{'p-invalid':v$.login.$invalid && loading}"/>
                </div>
                <div class="form-group pt-3"> 
                    <Button type="submit" label="Submit" class="mt-2" :disabled="loading" style="width: 100%;"> 
                        <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                        <span class="text-center" style="width: 100%;">Confirm</span>                 
                    </Button>
                </div>
                <div class="form-group pt-1 text-center"> 
                    <a href="/register" :to="register" class="px-1">New user</a>
                    <a href="/requestrestore" :to="restore" class="px-1">Forgot password</a>
                </div>                
                <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">Status: {{message}}</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import User from '../models/user';
import Divider from 'primevue/divider';
import { email, required } from 'vuelidate/lib/validators';
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from './../stores/auth';

export default {
  name: 'PasswordConfirmation',
  setup: () => ({ 
        v$: useVuelidate()
    }),
  components: { InputText, Password, Button }, 
  data() {
    return {
        login: '',
        loading: false,
        message: '',
        authStore: null,
        token: null
        };
    },
  validations() {
      return {
          login: {
              required,
              email
          },
          token: {
              required
          }
      }
  },
  created() {
    this.authStore = useAuthStore();
		this.token = this.$route.query?.token;
  },  
  methods: {
    handleLogin(isFormValid) {
        this.loading = true;

        if (!isFormValid) {
            this.$toast.add({severity:'warn', summary: 'Password restore', detail:'Data is incorrect', life: 3000});
            this.loading = false;
            return;
        }

        if (this.login && this.token) {            
            this.authStore.confirm(this.login, this.token).then((result) => {
              this.$toast.add({severity:'success', summary: 'Password restore', detail:'Your password is confirm', life: 3000});
              this.$router.push('/login');
            }, 
            error => {
              this.loading = false;
              this.message = (error.response && error.response.data.message) || error.response.data.status || error.message || error.toString();
            });
        }
    }
  }
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