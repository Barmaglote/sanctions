<template>
    <div class="p-0 p-flex justify-content-center card-container_horizontal_center">
      <bg-profile class="shadow-1"/>
      <bg-redirect class="shadow-0 m-2"></bg-redirect>
    </div>
</template>

<script>
  import Profile from "@/components/auth/Profile.vue";
  import Redirect from "@/components/redirect/Redirect.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Profile",
        meta: [
          {
            hid: 'profile',
            name: 'Profile',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    layout: 'auth',
    components: { 'bg-profile': Profile, 'bg-redirect': Redirect },
  }
</script>
