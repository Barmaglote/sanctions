<template>
	<div class="flex flex-wrap p-4 bg-white">
    <form name="form" @submit.prevent="handleSubmit(!v$.$invalid)" class="w-full" v-if="isLogged">
      <div class="w-full">
        <client-only placeholder="loading...">
          <Editor editorStyle="height: 320px" v-model="state.post"/>
        </client-only>
      </div>
      <div class="w-full py-2">
        <bg-interests-selector :value="state.tags" :maxArrayLength="5"></bg-interests-selector>
      </div>
      <div class="pt-3">
        <Button type="submit" label="Submit" class="align-self-center" :disabled="loading">
          <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
          <span class="text-center" style="width: 100%;">Post</span>
        </Button>
      </div>
    </form>
    <div v-if="!isLogged">
      <Message severity="warn" :closable="false">To post you must be logged in before</Message>
    </div>
	</div>
</template>

<script>
  import Button from 'primevue/button';
  import { useContext } from '@nuxtjs/composition-api'
  import { reactive, ref, computed } from 'vue'
  import { required } from 'vuelidate/lib/validators'
  import { useVuelidate } from "@vuelidate/core"
  import Message from 'primevue/message';
  import InterestsSelector from '../core/InterestsSelector.vue';

  export default {
    emits: ['submit'],
	  components: { Editor: async () => process.client ? (await import("primevue/editor")) : "",
      Button,
      Message,
      'bg-interests-selector': InterestsSelector
    },
    setup(_, ctx) {
      const message = ref('')
      const loading = ref(false)
      const state = reactive({
        post: '',
        tags: []
      })
      const rules = {
        post: { required }
      }

      let v$ = useVuelidate(rules, state)

      const { $addPost, $toast } = useContext()
      const handleSubmit = (isFormValid) => {
        loading.value = true;
        if (!isFormValid) {
          $toast.error('Data is incorrect')
          loading.value = false;
          return;
        }

        $addPost(state.post, state.tags).then(() => {
          message.value = "";
          $toast.success('Your post is added');
          loading.value = false;
          state.post = '';
          state.tags = [];
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

    const { $auth } = useContext()
   	const isLogged = computed(() => $auth.loggedIn )

		return { v$, loading, message, handleSubmit, state, isLogged }
    }
  }
</script>

