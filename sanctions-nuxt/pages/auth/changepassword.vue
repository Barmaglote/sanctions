<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <bg-change-password/>
    </div>                            
</template>

<script>
  import ChangePassword from "@/components/auth/ChangePassword.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Change password",
        meta: [
          {
            hid: 'changepassword',
            name: 'Change password',
            content: 'My custom description' // TODO
          }
        ]
      }
	  }, 
    layout: 'auth',
    components: { 'bg-change-password': ChangePassword }
  }
</script>