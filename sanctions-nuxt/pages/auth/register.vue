<template>
    <div class="p-0 p-text-center p-flex justify-content-center card-container_horizontal_center">
        <bg-register class="card_shadow"/>
    </div>
</template>

<script>
  import Register from "@/components/auth/Register.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Register",
        meta: [
          {
            hid: 'register',
            name: 'Register',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    layout: 'auth',
    components: { 'bg-register': Register },
  }
</script>

<style>
.surface-ground {
  display: flex;
}
</style>
