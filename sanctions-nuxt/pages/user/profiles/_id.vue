<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-12 md:col-6 md:col-offset-3">
      <bg-user-header :user-id="id || userid" v-if="(id || userid) != null" ></bg-user-header>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useRoute } from '@nuxtjs/composition-api'
  import Header from '@/components/user/Header.vue'
  import { useContext } from '@nuxtjs/composition-api'

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
      'bg-user-header': Header
    }
  }
</script>
