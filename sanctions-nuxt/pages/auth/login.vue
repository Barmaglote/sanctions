<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <bg-login/>
    </div>                            
</template>

<script>

  import Login from "@/components/auth/Login";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Sign in",
        meta: [
          {
            hid: 'login',
            name: 'Sign in',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },             
    components: { 
      'bg-login': Login 
    },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>