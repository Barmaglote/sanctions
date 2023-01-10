<template>
    <div class="card comment-container h-auto">
        <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)">
          <div class="form-group">
            <TextArea type="text" id="comment" rows="5" class="h-full" :autoResize="true" v-model="v$.comment.$model" :class="{'p-invalid':v$.comment.$invalid && loading}"/>
            <div class="grid flex pt-2">
              <div class="col-8 p-text-center justify-content-start flex align-items-center">
                <div v-if="message" class="alert alert-danger pt-2" role="alert">Status: {{message}}</div>
              </div>
              <div class="col-4 p-text-center justify-content-end flex align-items-center">
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
    emits: ['submit'],
    setup({ reputationObjectId, parentId }, ctx) {
      const message = ref('')
      const loading = ref(false)
      const state = reactive({
        comment: '',
        reputationObjectId,
        parentId
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
        $addComment(state.comment, state.parentId, state.reputationObjectId).then(() => {
          $toast.success('Your comment is added');
          loading.value = false;
          ctx.emit('submit');
        },
        () => {
          loading.value = false;
          message.value = "Unable to post";
          $toast.error(message.value)
        }, () => {
          console.log('finished');
          loading.value = false;
        });
      }

      return { v$, loading, message, handleSubmit }
    },
    components: { TextArea, Button },
    props: {
      reputationObjectId: {
        type: String,
        default: () => null,
      },
      reputationObjectId: {
        type: String,
        default: () => null,
      }
    },
}
</script>

