<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <RequestRestore/>
    </div>                            
</template>

<script>
  import RequestRestore from "./../components/RequestRestore.vue";

  export default {
    name: "RestoreView",
    components: { RequestRestore },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>