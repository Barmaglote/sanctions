<template>
    <div class="p-col-12">
        <div class="card card-container">
            <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
            <form name="form" @submit.prevent="handlePasswordChange(!v$.$invalid)">
            <input type="hidden" v-model="login"/>
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
                    <label for="newpasswordconfirmation" :class="{'p-error': v$.newpasswordconfirmation.$invalid && submitted || newpassword != newpasswordconfirmation }">New password (confirm)</label>
                    <Password id="newpasswordconfirmation" v-model="v$.newpasswordconfirmation.$model" :class="{'p-invalid':v$.newpasswordconfirmation.$invalid && submitted && newpassword != newpasswordconfirmation}" toggleMask>
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
                    <a href="/register" :to="register">New user</a>
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
import { email, required } from 'vuelidate/lib/validators';
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from './../stores/auth';

export default {
  name: 'Restore',
  setup: () => ({ 
        v$: useVuelidate()
    }),
  components: { InputText, Password, Button }, 
  data() {
    return {
        token: '',
        login: null,
        newpassword: '',
        newpasswordconfirmation: '',
        loading: false,
        message: '',
        authStore: null
        };
    },
  validations() {
      return {
          newpassword: {
              required
          },
          login: {
            required
          },
          newpasswordconfirmation: {
              required
          }
      }
  },  
  computed: {
    loggedIn() {
       return this.authStore.state.status.loggedIn;
    }
  },
  created() {
    this.authStore = useAuthStore();
    this.token = this.$route.query.token; 
    this.login = this.$route.query.login; 
  },
  methods: {
    handlePasswordChange(isFormValid) {
        this.loading = true;

        if (!isFormValid) {
            this.loading = false;
            return;
        }

        if (this.newpassword && this.token && this.login) {
              this.authStore.restore(this.newpassword, this.token, this.login).then((result) => {
              this.$toast.add({severity:'success', summary: 'New user', detail:'Your request is accepted. Confirmation link is sent to your e-mail', life: 3000});
              this.$router.push('/login');
            }, 
            error => {
              this.loading = false;
              this.message = (error.response && error.response.data.status) || error.message || error.toString();
            });
        } else {
            this.loading = false;
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