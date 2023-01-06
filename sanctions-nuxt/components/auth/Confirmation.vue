<template>
    <div class="p-col-12">
        <div class="card card-container">
            <bg-home-button/>
            <img id="profile-img" src="@/assets/avatar_2x.png" class="profile-img-card mb-4"/>
            <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
                <input type="hidden" v-model="v$.token.$model">
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
                    <a href="/auth/register" class="px-1">New user</a>
                    <a href="/auth/requestrestore" class="px-1">Forgot password</a>
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
import Divider from 'primevue/divider'
import { email, required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { onMounted, reactive, ref } from 'vue'
import { useContext, useRouter } from '@nuxtjs/composition-api'
import HomeButton from '@/components/core/HomeButton.vue'

export default {
  setup(props){

    const state = reactive({
      login: '',
      token: null,
    })

    const rules = {
      login: { required, email },
      token: { required }
    }

    let v$ = useVuelidate(rules, state)

    const router = useRouter()
    const { $confirm, $toast } = useContext()

    const loading = ref(false)
    const message = ref('')

		onMounted(() => {
		  state.token = props.token;
		})

    const handleSubmit = (isFormValid) => {
      loading.value = true;
      if (!isFormValid) {
        $toast.error('Data is incorrect')
        loading.value = false;
        return;
      }

      if (state.login && state.token) {
        $confirm(state.login, state.token).then((result) => {
          $toast.success('Your password is confirmed')
          router.push('/auth/login');
        },
        error => {
          loading.value = false;
          message.value = (error.response && error.response?.data?.message) || error.response?.data?.status || error.message || error.toString();
          $toast.error(message.value)
        });
      }
    }

    return { v$, loading, message, handleSubmit }
  },
  components: { InputText, Password, Button, Divider, 'bg-home-button': HomeButton },
  props: {
    token: String
  },
};
</script>
