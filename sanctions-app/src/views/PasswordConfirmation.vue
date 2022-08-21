<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <PasswordConfirmation></PasswordConfirmation>
    </div>                            
</template>

<script>
  import PasswordConfirmation from "./../components/PasswordConfirmation.vue";

  export default {
    name: "PasswordConfirmationView",
    components: { PasswordConfirmation },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>