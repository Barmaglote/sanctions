<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <bg-registered/>
    </div>                            
</template>

<script>
  import Registered from "@/components/auth/Registered.vue";

  export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Auth: Registered",
        meta: [
          {
            hid: 'registered',
            name: 'Registered',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    layout: 'auth',
    components: { 'bg-registered': Registered },
  }
</script>