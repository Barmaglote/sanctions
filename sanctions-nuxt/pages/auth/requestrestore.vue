<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <bg-request-restore/>
    </div>                            
</template>

<script>
  import RequestRestore from "@/components/auth/RequestRestore.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Request password restore",
        meta: [
          {
            hid: 'requestrestore',
            name: 'Request password restore',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },    
    layout: 'auth',
    components: { 'bg-request-restore': RequestRestore },
  }
</script>