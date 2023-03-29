<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-12 md:col-6 md:col-offset-3" v-if="post && post._id">
      <bg-post :post="post" class="border-1 border-300 card p-5 my-1" :view="'full'"></bg-post>
      <bg-comments
        :comments="comments"
        class="border-1 border-300 card p-5 my-1"
        v-if="comments && comments?.length > 0"
        :total="commentsTotal"
        @submit="refetch"
        :reputation-object-id="id">
      </bg-comments>
      <bg-add-comment class="border-1 border-300 card p-5 my-1 pt-6" v-if="isLogged" :reputation-object-id="id" @submit="refetch"></bg-add-comment>
    </div>
    <div class="col-12 md:col-6 md:col-offset-3" v-if="!post || !post._id">
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton height="4rem" class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton height="4rem" class="mb-2"></Skeleton>
    </div>
  </div>
</template>

<script>
  import Post from "@/components/posts/Post.vue"
  import Comments from "@/components/comments/Comments.vue"
  import AddComment from "@/components/comments/AddComment.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed, ref } from 'vue'
  import POST_QUERY from '@/queries/post.get.gql'
  import COMMENTS_QUERY from '@/queries/comments.gql'
  import { useContext } from '@nuxtjs/composition-api'
  import Skeleton from 'primevue/skeleton/Skeleton';

  export default {
    apollo: {
      post: {
        prefetch: true,
        query: POST_QUERY,
        variables () {
          return { _id: this.id }
        }
      },
      comments: {
        prefetch: true,
        query: COMMENTS_QUERY,
        variables () {
          let lazyLoadEvent = this.lastLazyLoadEvent?.value ||
          {
            sortField: null,
            sortOrder: null,
            first: 0,
            rows: 10,
            filters: null
          }

          return {
            reputationObjectId: this.id,
            lazyLoadEvent
          }
        }
      },
      commentsTotal: {
        prefetch: true,
        query: COMMENTS_QUERY,
        variables () {
          return {
            reputationObjectId: this.id
          }
        }
      },
    },
    head() {
      return {
        title: process.env.SITE_TITLE + " | Sanctions: Persons",
        meta: [
          {
            hid: 'post',
            name: 'Post: ' + this.id,
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    components: {
      'bg-post': Post,
      'bg-comments': Comments,
      'bg-add-comment': AddComment,
      Skeleton
    },
    setup() {
      const route = useRoute()
      const id = computed(() => route.value.params.id)
      const { $auth } = useContext()
      const isLogged = computed(() => $auth.loggedIn )
      const lastLazyLoadEvent = ref({
        sortField: null,
        sortOrder: null,
        first: 0,
        rows: 10,
        filters: null
      })

      return { id, isLogged, lastLazyLoadEvent }
    },
    methods: {
      refetch(lazyParams) {
        this.lastLazyLoadEvent.value = {
          filters: null,
          sortField: null,
          sortOrder: null,
          first: lazyParams?.value?.first || 0,
          rows: lazyParams?.value?.rows || 10
        }

        this.$apollo.queries.post.refetch()
        this.$apollo.queries.comments.refetch()
        this.$apollo.queries.commentsTotal.refetch()
      }
    }
  }
</script>
