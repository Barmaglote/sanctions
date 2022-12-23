<template>
  <div class="card card-container">
    <label for="nickname" class="py-2" :class="{'p-error':v$.nickname.$invalid && loading}">Nickname</label>
    <div class="text-center p-flex flex-row flex-1" style="display: flex;">    	
      <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
        <InputText id="nickname" type="text" v-model="v$.nickname.$model" />
        <Button type="submit" icon="pi pi-user-plus" class="mx-2 px-5">
         <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
         <i class="pi pi-user-plus mr-2" style="font-size: 1rem"></i> 
        </Button>
      </form>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger pt-2" role="alert">Status: {{message}}</div>
      </div>
    </div>
    <div class="py-2 text-center">
      <a href="/">Home</a>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import { useProfileStore } from '@/store/profiles'
import HomeButton from '@/components/core/HomeButton.vue'
import InputText from 'primevue/inputtext'
import { reactive, ref, onMounted } from 'vue'
import { required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { useContext, useRouter } from '@nuxtjs/composition-api'

export default {  
  setup(){ 
    const profileStore = useProfileStore()
    const state = reactive({
        nickname: ''
    })

    const rules = {
        nickname: { required } 
    }

    let v$ = useVuelidate(rules, state)
    
    const loading = ref(false)
    const submitted = ref(false)
    const message = ref('')    
   
    let ctx = null;

		onMounted(() => {
			ctx = useContext()
		});

    const router = useRouter()

    const handleSubmit = async (isFormValid) => {
      loading.value = true

      if ( !isFormValid ) {
        loading.value = false
        return
      }

      await profileStore.createProfile(state.nickname, ctx)
      loading.value = false
      if (profileStore?.profile?.nickname) {
        router.push('/user/profile')
      }      
    }

    return { state, v$, handleSubmit, loading, submitted, message }
  },
  components: { InputText, Button, 'bg-home-button': HomeButton }
}
</script>

<style scoped>
  form {
    display: flex;
  }
</style>