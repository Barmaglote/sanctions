<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <bg-restore/>
    </div>                            
</template>

<script>
  import Restore from "@/components/auth/Restore.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Restore password",
        meta: [
          {
            hid: 'restore',
            name: 'Restore password',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    components: { 'bg-restore': Restore },
  }
</script>