<template>
  <div style="width: 100%">
    <div class="flex flex-wrap">
      <div v-for="like, i in likes" :id="i" class="my-1">
        <bg-like-feed-item :like="like"></bg-like-feed-item>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, useContext } from '@nuxtjs/composition-api'
  import { ref } from 'vue'
  import LikesFeedItem from './LikesFeedItem.vue'

  export default {
    components: {
      'bg-like-feed-item': LikesFeedItem
    },
    setup({ userId }) {
      const { $getLikesFeed } = useContext()
      const loading = ref(false)
      const page = ref(0)
      const likes = ref([])

      const fetchLikes = () => {
        $getLikesFeed(userId, page.value++ ).then((result) => {
          if (!result?.data?.likesFeed) { return }
          likes.value = [...likes.value, ...JSON.parse(JSON.stringify(result.data.likesFeed))]
          console.log(result.data.likesFeed)
        })
      }

      const reputationObject = {
        'per': 'Person',
        'org': 'Organization',
        'com': 'Comment',
        'pos': 'Post'
      }

      onMounted(() => {
        fetchLikes()
      })

      return { loading, fetchLikes, likes, reputationObject }
    },
    props: {
      userId: {
        type: String,
        default: () => null,
      },
    }
  }
</script>
