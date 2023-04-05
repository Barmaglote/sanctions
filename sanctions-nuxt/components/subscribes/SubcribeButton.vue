<template>
  <div class="flex" v-if="state.isSubscribed !== null">
    <ToggleButton class="w-8rem h-2rem" v-if="isLogged" v-model="state.isSubscribed" @click="updateSubscribtion(reputationObjectId, reputationObjectType)" :disabled="!isLogged" onLabel="Unread" offLabel="Read" onIcon="pi pi-check" offIcon="pi pi-times">
    </ToggleButton>
  </div>
</template>

<script>
  import { useContext } from '@nuxtjs/composition-api'
  import Button from 'primevue/button'
  import { reactive, onMounted, computed } from 'vue'
  import ToggleButton from 'primevue/togglebutton';
  import PlaylistCheck from 'vue-material-design-icons/PlaylistCheck.vue';

  export default {
	  components: {
      Button, PlaylistCheck, ToggleButton
    },
    props: {
      reputationObjectId: {
        type: String,
        default: () => null
      },
      reputationObjectType: {
        type: String,
        default: () => null
      }
    },
    setup({ reputationObjectId, reputationObjectType }) {
      const { $updateSubscribtion, $auth, $isSubscribed } = useContext()

      const isLogged = computed(() => $auth.loggedIn )
      const objectId = computed(() => $auth.user?.id )

      const state = reactive({
        isSubscribed: false
      })

      const updateSubscribtion = (reputationObjectId, reputationObjectType) => {

        if (!isLogged.value || !objectId.value || !reputationObjectType || !reputationObjectId) return;

        $updateSubscribtion(reputationObjectId, reputationObjectType, objectId.value).then((result) => {
          state.isSubscribed = result?.data?.updateSubscribtion;
        });
      }

      const checkSubscribtion = (reputationObjectId) => {

        if (!isLogged.value || !objectId.value || !reputationObjectId) return;

        $isSubscribed(objectId.value, reputationObjectId).then((result) => {
          if (!result || !result.data) { return }

          state.isSubscribed = result?.data?.isSubscribed || false
        });
      }

      onMounted(() => {
        checkSubscribtion(reputationObjectId);
      })

      return { state, updateSubscribtion, isLogged, reputationObjectId, reputationObjectType }
    }
}
</script>
