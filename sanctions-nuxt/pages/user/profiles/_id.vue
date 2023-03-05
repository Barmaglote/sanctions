<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-12 md:col-6 md:col-offset-3">
      <bg-user-header :user-id="id || userid" v-if="(id || userid) != null"></bg-user-header>
      <div class="shadow-1">
        <TabView>
	        <TabPanel header="Likes">
		        <bg-likes-feed :user-id="id || userid" v-if="(id || userid) != null"/>
	        </TabPanel>
	        <TabPanel header="Comments">
            <bg-comments-feed
              class="my-1"
              :user-id="id || userid">
            </bg-comments-feed>
	        </TabPanel>
	        <TabPanel header="Subscribtion">
		        Content II
	        </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useRoute } from '@nuxtjs/composition-api'
  import Header from '@/components/user/Header.vue'
  import { useContext } from '@nuxtjs/composition-api'
  import TabView from 'primevue/tabview'
  import TabPanel from 'primevue/tabpanel'
  import LikesFeed from '@/components/user/LikesFeed.vue'
  import CommentsFeed from '~/components/user/CommentsFeed.vue'

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Feed: Persons",
        meta: [
          {
            hid: 'public_user_feed',
            name: 'Public profile of user',
            content: 'Public profile of user' // TODO
          }
        ]
      }
	  },
    setup() {
      const route = useRoute()
      const { $auth } = useContext()
      const id = computed(() => route.value.params.id)
      return { id, 'userid': $auth?.user?.id }
    },
    components: {
      'bg-user-header': Header,
      'bg-likes-feed': LikesFeed,
      'bg-comments-feed': CommentsFeed,
      TabView, TabPanel
    }
  }
</script>
