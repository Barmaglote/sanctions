<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <Registered/>
    </div>                            
</template>

<script>
  import Registered from "./../components/Registered.vue";

  export default {
    name: "RegisteredView",
    components: { Registered },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>