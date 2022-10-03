<template>
    <div>
      <Button label="Home" icon='pi pi-home' class="p-button-raised p-button-rounded" @click="handleClick()" />
	  </div>
</template>

<script>
  import Button from 'primevue/button';
  import { useRouter } from '@nuxtjs/composition-api'

  export default {
    setup() {  
      const router = useRouter()

      const handleClick = () => {
        router.push('/')
      }

      return {
          handleClick
      }
    },
    components: { Button }
  }
</script>
