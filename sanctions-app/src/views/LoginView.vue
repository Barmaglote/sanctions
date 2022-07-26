<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <Login/>
    </div>                            
</template>

<script>
  import Login from "./../components/Login.vue";

  export default {
    name: "LoginView",
    components: { Login },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>