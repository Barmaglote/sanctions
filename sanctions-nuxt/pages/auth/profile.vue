<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <bg-profile/>
    </div>                            
</template>

<script>
  import Profile from "@/components/auth/Profile.vue";

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
    components: { 'bg-profile': Profile },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>