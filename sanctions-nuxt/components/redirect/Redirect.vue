<template>
  <div class="p-4" v-id="isRedirect">
    <ProgressBar mode="indeterminate" style="height: .5em" />
    <div class="p-1">Redirect to {{ back }}</div>
  </div>
</template>

<script>
  import ProgressBar from 'primevue/progressbar';
  import { useRouter } from '@nuxtjs/composition-api'
  export default {
    setup(){
      const back = localStorage?.getItem('back');
      const isRedirect = back && !back.toLocaleLowerCase().startsWith('/auth')
      const router = useRouter()

      if (isRedirect) {
        setTimeout(() => {
          router.push(back);
        }, 2000)
      }

      return { back, isRedirect }
    },
    components: {
      ProgressBar
    }
  }
</script>
