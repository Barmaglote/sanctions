<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
        <ChangePassword/>
    </div>                            
</template>

<script>
  import ChangePassword from "./../components/ChangePassword.vue";

  export default {
    name: "ChangePasswordView",
    components: { ChangePassword }
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>