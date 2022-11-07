<template>          
    <div class="p-0 p-text-center p-flex justify-content-center page">
      <bg-profile/>
    </div>                            
</template>

<script>
  import Home from "~/components/user/Personal.vue";

  export default {
    middleware: ['authenticated'],
    head() {
      return {
        title: process.env.SITE_TITLE + " | User: Home",
        meta: [
          {
            hid: 'user-home',
            name: 'Home',
            content: 'My custom description' // TODO
          }
        ]
      }
	  }, 
    components: { 'bg-home': Home },
  }
</script>

<style>
.page {
  height: 100%;
}
</style>