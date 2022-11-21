<template>
  <div class="card card-container">
    <label for="nickname" class="py-2" :class="{'p-error':v$.nickname.$invalid && loading}">Nickname</label>
    <div class="text-center p-flex flex-row flex-1" style="display: flex;">    	
      {{!v$.$invalid}}
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
import { reactive, ref } from 'vue'
import { required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { useContext } from '@nuxtjs/composition-api'

export default {  
  setup(props){ 
    const state = reactive({
        nickname: ''
    })

    const rules = {
        nickname: { required } 
    }

    let v$ = useVuelidate(rules, state)

    const { $createProfile } = useContext()

    //const profilesStore = useProfileStore()
  
    const loading = ref(false)
    const submitted = ref(false)
    const message = ref('')    

    const handleSubmit = async (isFormValid) => {
      loading.value = true

      if ( !isFormValid ) {
        loading.value = false
        return
      }

      console.log(props.store)
      const profile = await props.store.createProfile(state.nickname)
      //const profile = await $createProfile(state.nickname)      
      loading.value = false
    }

    return { state, v$, handleSubmit, loading, submitted, message }
  },
  components: { InputText, Button, 'bg-home-button': HomeButton },
  props: {
    store: null
  },
}
</script>

<style scoped>
  form {
    display: flex;
  }
</style>