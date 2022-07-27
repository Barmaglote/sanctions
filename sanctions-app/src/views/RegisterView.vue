<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <Register/>
    </div>                            
</template>

<script>
  import Register from "./../components/Register.vue";

  export default {
    name: "RegisterView",
    components: { Register },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>