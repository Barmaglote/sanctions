<template>
    <div class="p-0 p-text-center p-flex justify-content-center page">
      <bg-profile/>
    </div>
</template>

<script>
  import Profile from "@/components/user/Profile.vue";

  export default {
    middleware: ['authenticated'],
    head() {
      return {
        title: process.env.SITE_TITLE + " | User: Profile",
        meta: [
          {
            hid: 'user-profile',
            name: 'Profile',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    layout: 'user',
    components: { 'bg-profile': Profile },
  }
</script>

<style>
.page {
  height: 100%;
}
</style>
