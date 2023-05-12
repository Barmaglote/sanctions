<template>
  <div class="h-full w-full p-5">
    <div class="shadow-1 p-5 bg-white">
      <bg-add-association/>
    </div>
  </div>
</template>

<script>
  import AddAssociation from "@/components/user/AddAssociation.vue";

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
    components: { 'bg-add-association': AddAssociation },
  }
</script>

<style>
.page {
  height: 100%;
}
</style>
