<template>
    <div class="card comment-container h-auto">
        <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
          <div class="form-group">
            <TextArea type="text" id="comment" rows="5" class="h-full" :autoResize="true" v-model="v$.comment.$model" :class="{'p-invalid':v$.comment.$invalid && loading}"/>
            <div class="grid flex">
              <div class="col-4 p-text-center justify-content-end flex">
                <div v-if="message" class="alert alert-danger pt-2" role="alert">Status: {{message}}</div>
              </div>
              <div class="col-4 col-offset-8 p-text-center justify-content-end flex my-2">
                <Button type="submit" label="Submit" class="align-self-center" :disabled="loading">
                  <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                  <span class="text-center" style="width: 100%;">Post</span>
                </Button>
              </div>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
import TextArea from 'primevue/textarea';
import { reactive, ref } from 'vue'
import Button from 'primevue/button';
import { required } from 'vuelidate/lib/validators'
import { useVuelidate } from "@vuelidate/core"
import { useContext } from '@nuxtjs/composition-api'

export default {
    setup() {
      const message = ref('')
      const loading = ref(false)
      const state = reactive({
        comment: '',
        reputationObjectId: '62e55e60858d07000740db32',
        parentId: null
      })
      const rules = {
        comment: { required },
        reputationObjectId: { required }
      }

      let v$ = useVuelidate(rules, state)

      const { $addComment, $toast } = useContext()
      const handleSubmit = (isFormValid) => {
        loading.value = true;
        if (!isFormValid) {
          $toast.error('Data is incorrect')
          loading.value = false;
          return;
        }
        $addComment(state.comment, state.parentId, state.reputationObjectId).then((result) => {
          $toast.success('Your comment is added');
        },
        error => {
          loading.value = false;
          message.value = "Unable to post";
          $toast.error(message.value)
        });
      }

      return { v$, loading, message, handleSubmit }
    },
    components: { TextArea, Button }
}
</script>

