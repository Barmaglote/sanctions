<template>
    <div class="flex-column">
      <h2>Info</h2>
      <Textarea v-model="value" :autoResize="true" rows="5" cols="30" class="border-blue-500 w-full"/>
      <div class="flex justify-content-end flex-wrap py-2">
        <Button label="Save" class="p-button-info" />
      </div>
    </div>
</template>
  
<script>
  import Button from 'primevue/button';

  export default {
    setup() {
        return {  }
    },
    components: { Button }
  }
</script>
  
  