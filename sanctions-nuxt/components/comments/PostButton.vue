<template>
  <div class="flex align-content-center flex-wrap">
    <Button class="p-button-text py-0 px-2" @click="display=true" :disabled="!isLogged">
      <comment-edit-outline></comment-edit-outline>
    </Button>

    <bg-modal-window v-if="display" @close-modal="display=false">
      <bg-add-comment :reputation-object-id="userId" @submit="display=false"></bg-add-comment>
    </bg-modal-window>
  </div>
</template>

<script>
  import Button from 'primevue/button'
  import { useContext } from '@nuxtjs/composition-api'
  import CommentEditOutline from 'vue-material-design-icons/CommentEditOutline.vue';
  import { ref, computed } from 'vue'
  import ModalWindow from '~/components/core/ModalWindow.vue'
  import AddComment from './AddComment.vue';

  export default {
    components: {
      Button, CommentEditOutline, 'bg-modal-window': ModalWindow, 'bg-add-comment': AddComment
    },
    setup(){
      const { $auth } = useContext()
      const isLogged = computed(() => $auth.loggedIn )
      const userId = computed(() => $auth.user.id )
      const display = ref(false)

      return { isLogged, display, userId }
    }
  }
</script>
