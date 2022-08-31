<template>
  <div class="surface-ground">          
    <div class="col-12 md:col-12 p-0">
          <bg-links :search="search"/>    
    </div>                            
  </div>              
</template>

<script>
  import Links from "@/components/Links.vue";
  import EventBus from './../common/EventBus.js';

  export default {
    components: { 
      'bg-links': Links 
      }, 
    props: {
      search: {
        type: String,
        default: null,
      }
    },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}

.tags-card {	
    position: fixed;
    padding: 1em !important;
    width: inherit;
    padding: 0 1.5em 0 0 !important;
}
</style>