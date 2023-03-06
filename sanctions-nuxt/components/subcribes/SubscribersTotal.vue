<template>
  <div class="flex justify-content-center">
    Subscribers: {{ state.total }}
  </div>
</template>

<script>
 import { reactive, onMounted } from 'vue'
 import { useContext } from '@nuxtjs/composition-api'

export default {
  props: {
      reputationObjectId: {
        type: String,
        default: () => null
      }
    },
    setup({ reputationObjectId, reputationObjectType }) {

      const { $getSubscribersTotal } = useContext()

      const state = reactive({
        total: 0
      })

      const getSubscribersTotal = (reputationObjectId) => {

        if (!reputationObjectId) return;

        $getSubscribersTotal(reputationObjectId).then((result) => {
          state.total = result?.data?.getSubscribersTotal;
        });
      }

      onMounted(() => {
        getSubscribersTotal(reputationObjectId);
      })

      return { state }
    }
}
</script>

