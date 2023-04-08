<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-12 md:col-6 md:col-offset-3" v-if="person">
      <bg-person :person="person" class="shadow-1 card p-5 mt-1" :tags="tags" :reputation-object-id="id" ></bg-person>
      <div class="shadow-1">
        <TabView>
	        <TabPanel header="Likes">
		        <bg-likes-feed :user-id="id" v-if="id"/>
	        </TabPanel>
	        <TabPanel header="Comments">
            <bg-comments
              :comments="comments"
              class=""
              v-if="comments && comments?.length > 0"
              :total="commentsTotal"
              @submit="refetch"
              :reputation-object-id="id">
            </bg-comments>
            <bg-add-comment class="border-1 border-300 card p-5 my-1 pt-6" v-if="isLogged" :reputation-object-id="id" @submit="refetch"></bg-add-comment>
	        </TabPanel>
	        <TabPanel header="Post">
            <bg-posts :authorId="id"></bg-posts>
	        </TabPanel>
	        <TabPanel header="Subscribtions">
		        <bg-subscribtions-feed class="my-1" :user-id="id"></bg-subscribtions-feed>
	        </TabPanel>
        </TabView>
      </div>

    </div>
  </div>
</template>

<script>
  import Person from "@/components/persons/Person.vue"
  import Comments from "@/components/comments/Comments.vue"
  import AddComment from "@/components/comments/AddComment.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed, ref } from 'vue'
  import PERSON_QUERY from '@/queries/person.gql'
  import TAGS_QUERY from '@/queries/tags.gql'
  import COMMENTS_QUERY from '@/queries/comments.gql'
  import { useContext } from '@nuxtjs/composition-api'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import LikesFeed from '@/components/user/LikesFeed.vue'
  import SubscribtionsFeed from '~/components/user/SubcribtionsFeed.vue'
  import Posts from '~/components/posts/Posts.vue';

  export default {
    apollo: {
      person: {
        prefetch: true,
        query: PERSON_QUERY,
        variables () {
          return { _id: this.id }
        },
      },
      tags: {
        prefetch: true,
        query: TAGS_QUERY,
        variables () {
          return { area: "persons" }
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
            hid: 'sanctions_person',
            name: 'Profile of person: ' + this.id,
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    components: {
      'bg-person': Person,
      'bg-comments': Comments,
      'bg-add-comment': AddComment,
      'bg-likes-feed': LikesFeed,
      'bg-subscribtions-feed': SubscribtionsFeed,
      'bg-posts': Posts,
      TabView, TabPanel,
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

        this.$apollo.queries.comments.refetch()
        this.$apollo.queries.commentsTotal.refetch()
      }
    }
  }
</script>
