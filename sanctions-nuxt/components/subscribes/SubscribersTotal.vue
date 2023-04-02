<template>
  <div class="flex justify-content-center">
    <div class="w-1rem text-base font-semibold text-600">{{ state.total | shortNumber }}</div>
    <playlist-check fillColor="#2196F3"></playlist-check>
  </div>
</template>

<script>
 import { reactive, onMounted } from 'vue'
 import { useContext } from '@nuxtjs/composition-api'
 import PlaylistCheck from 'vue-material-design-icons/PlaylistCheck.vue';

export default {
  props: {
    reputationObjectId: {
      type: String,
      default: () => null
    }
  },
  components:{
    PlaylistCheck
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

