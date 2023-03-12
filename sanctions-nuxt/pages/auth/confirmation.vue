<template>
    <div class="p-0 p-text-center p-flex justify-content-center card-container_horizontal_center">
      <bg-confirmation :token="token" class="shadow-1"/>
    </div>
</template>

<script>
  import PasswordConfirmation from "@/components/auth/Confirmation.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed } from 'vue';

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Password confirmation",
        meta: [
          {
            hid: 'confirmation',
            name: 'Password confirmation',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    setup({}){
      const route = useRoute()

      const token = computed(() => {
        return route.value.query.token
      })

      return { token }
    },
    layout: 'auth',
    components: { 'bg-confirmation': PasswordConfirmation },
  }
</script>

<style>
.surface-ground {
  display: flex;
}
</style>
