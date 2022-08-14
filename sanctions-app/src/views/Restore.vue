<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <Restore></Restore>
    </div>                            
</template>

<script>
  import Restore from "./../components/Restore.vue";

  export default {
    name: "RestoreView",
    components: { Restore },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>