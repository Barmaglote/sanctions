<template>
  <div style="width: 100%">
    <div class="flex flex-wrap p-3">
      <div v-for="like, i in likes" :id="i" class="my-1 flex flex-wrap py-1 w-full">
        <bg-like-feed-item :like="like"></bg-like-feed-item>
      </div>
      <div class="w-full h-4rem flex justify-content-center" v-if="isMoreAvailable" >
        <Button @click="fetchLikes" label="More" class="p-button-text w-full" v-if="!loading"></Button>
        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, useContext } from '@nuxtjs/composition-api'
  import { ref } from 'vue'
  import LikesFeedItem from './LikesFeedItem.vue'
  import Button from 'primevue/button'
  import ProgressSpinner from 'primevue/progressspinner';

  export default {
    components: {
      'bg-like-feed-item': LikesFeedItem, Button, ProgressSpinner
    },
    setup({ userId }) {
      const { $getLikesFeed } = useContext()
      const loading = ref(false)
      const page = ref(0)
      const likes = ref([])
      const isMoreAvailable = ref(true)

      const fetchLikes = () => {
        if (loading.value === true || isMoreAvailable.value === false) return;
        loading.value = true;
        $getLikesFeed(userId, page.value++ ).then((result) => {

          if (!result?.data?.likesFeed || result?.data?.likesFeed.length < 10) {
            isMoreAvailable.value = false;
          }

          if (result?.data?.likesFeed === null || result?.data?.likesFeed.length === 0) { return }

          likes.value = [...likes.value, ...JSON.parse(JSON.stringify(result.data.likesFeed))]
        }).catch(e => {
          console.log(e)
        }).finally(x => {
          loading.value = false;
        })
      }

      onMounted(() => {
        fetchLikes()
      })

      return { loading, fetchLikes, likes, isMoreAvailable }
    },
    props: {
      userId: {
        type: String,
        default: () => null,
      },
    }
  }
</script>
