<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <Profile></Profile>
    </div>                            
</template>

<script>
  import Profile from "./../components/Profile.vue";

  export default {
    name: "ProfileView",
    components: { Profile },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>