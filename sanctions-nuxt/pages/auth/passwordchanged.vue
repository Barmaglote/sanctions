<template>          
    <div class="p-0 p-text-center p-flex justify-content-center">
      <bg-login/>
    </div>                            
</template>

<script>
  import Login from "@/components/auth/Login";

  export default {
    components: { 'bg-login': Login },
  }
</script>
