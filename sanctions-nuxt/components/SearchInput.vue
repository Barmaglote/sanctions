<template>  
  <div class="vue-inputgroup">
    <Button label="Clear" class="p-button p-button-text vuew-mx-1" icon="pi pi-trash" v-if="$route.query.search" @click="clear"><i class="pi pi-trash"></i></Button>
    <InputText placeholder="Search" type="text" @change="search" v-model="text"></InputText>        
  </div>
</template>

<script>  
  import { computed, ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { useContext, useRouter } from '@nuxtjs/composition-api'

  export default {
    setup() {
      const text = ref('')
      
      const router = useRouter();
      const { route } = useContext();
      const path = computed(() => route.value.path);

      const search = () => {
        let search = text.value;
        text.value = '';
        let querypath = path !== '/sanctions/organizations' ? '/sanctions/persons' : path;
        router.push({ path: querypath, query: { search: search } }); 
      }

      const clear = () => {
        text.value = '';
        router.push({ path: path.value });
      }

      return {
        text,
        path,
        search,
        clear,
        router
      }
    },
    components: {
      InputText, Button
    },
  }
</script>

<style scoped> 
.vue-inputgroup{
  display:flex;
  align-items: center;
}

.vuew-mx-2{
  margin: 0 0.8em;
}

.p-inputtext{
  width: 100%;
}
</style>