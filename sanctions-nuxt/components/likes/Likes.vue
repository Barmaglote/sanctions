<template>
  <div class="flex">
    <div class="likes w-1rem text-base font-semibold text-600">
      {{ state?.likes | shortNumber }}
    </div>
    <Button class="p-button-text py-0 px-0" @click="handleSubmit(true)" :disabled="state.like != null || !isLogged || isLikingLocked">
      <thumb-up v-if="state.like && state.like.isPositive === true"/>
      <thumb-up-outline v-else/>
    </Button>
    <div class="likes w-1rem text-base font-semibold ml-2 text-600">
      {{ state?.dislikes | shortNumber }}
    </div>
    <Button class="p-button-text py-0 px-0" @click="handleSubmit(false)" :disabled="state.like != null || !isLogged || isLikingLocked">
      <thumb-down v-if="state.like && state.like.isPositive === false"/>
      <thumb-down-outline v-else/>
    </Button>
  </div>
</template>

<script>
  import { useContext } from '@nuxtjs/composition-api'
  import Button from 'primevue/button'
  import { reactive, onMounted, computed } from 'vue'
  import ThumbDown from 'vue-material-design-icons/ThumbDown.vue';
  import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue';
  import ThumbUp from 'vue-material-design-icons/ThumbUp.vue';
  import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue';

  export default {
	  components: {
      Button, ThumbDown, ThumbDownOutline, ThumbUp, ThumbUpOutline
    },
    props: {
      reputationObjectId: {
        type: String,
        default: () => null
      },
      reputationObjectType: {
        type: String,
        default: () => null
      },
      isLikingLocked: {
        type: Boolean,
        default: () => false
      }
    },
    setup({ reputationObjectId, reputationObjectType }) {
      const { $addLike, $getLikesInfo, $getLikeInfo, $auth } = useContext()

      const isLogged = computed(() => $auth.loggedIn )

      const state = reactive({
        likes: 0,
        dislikes: 0,
        like: null
      })

      const fecthLikes = (reputationObjectId) => {
        $getLikesInfo(reputationObjectId).then((result) => {
          if (!result || !result.data) { return }
          state.likes = result?.data?.likes || 0;
          state.dislikes = result?.data?.dislikes || 0;
        });
      }

      const fecthLike = (reputationObjectId) => {
        if (!isLogged.value || isLogged.value === false) return;
        $getLikeInfo(reputationObjectId).then((result) => {
          if (!result || !result.data) { return }
          state.like = result.data?.like;
        });
      }

      onMounted(() => {
        fecthLikes(reputationObjectId);
        fecthLike(reputationObjectId);
      })

      const handleSubmit = (isPositive) => {
        if (!isLogged.value || isLogged.value === false) return;
        $addLike(reputationObjectId, isPositive, reputationObjectType).then((result) => {
          state.like = result.data?.addLike;
          fecthLikes(reputationObjectId);
        });
      }

      return { handleSubmit, state, fecthLikes, isLogged }
    }
}
</script>
