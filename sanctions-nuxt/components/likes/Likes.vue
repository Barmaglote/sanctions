<template>
  <div class="flex">
    <div class="likes w-1em text-base font-semibold text-green-300">
      {{ state.likes }}
    </div>
    <Button :icon="(state.like && state.like.isPositive === true) ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'" class="p-button-text py-0" @click="handleSubmit(true)" :disabled="state.like != null"  />
    <div class="likes w-1em text-base font-semibold text-red-300">
      {{ state.dislikes }}
    </div>
    <Button :icon="(state.like && state.like.isPositive === false) ? 'pi pi-thumbs-down-fill' : 'pi pi-thumbs-down'" class="p-button-text py-0" @click="handleSubmit(false)" :disabled="state.like != null" />
  </div>
</template>

<script>
  import { useContext } from '@nuxtjs/composition-api'
  import Button from 'primevue/button'
  import { reactive, onMounted } from 'vue'

  export default {
	  components: {
      Button
    },
    props: {
      reputationObjectId: {
        type: String,
        default: () => null
      }
    },
    setup({ reputationObjectId }) {
      const { $addLike, $getLikesInfo } = useContext()


      const state = reactive({
        likes: 0,
        dislikes: 0,
        like: null
      })

      const fecthLikes = (reputationObjectId) => {
        console.log("fecthLikes", reputationObjectId);
        $getLikesInfo(reputationObjectId).then((result) => {
          if (!result || !result.data) { return }
          state.likes = result?.data?.likes || 0;
          state.dislikes = result?.data?.dislikes || 0;
        });
      }

      onMounted(() => {
        fecthLikes(reputationObjectId)
      })

      const handleSubmit = (isPositive) => {
        $addLike(reputationObjectId, isPositive).then((result) => {
          state.like = result.data?.addLike;
          fecthLikes(reputationObjectId);
        });
      }

      return { handleSubmit, state }
    }
}
</script>
