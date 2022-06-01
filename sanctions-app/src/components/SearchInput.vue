<template>
  <div class="vue-inputgroup">
    <Button label="Clear" class="p-button p-button-text vuew-mx-1" icon="pi pi-trash" v-if="$route.query.search" @click="clear"><i class="pi pi-trash"></i></Button>
    <InputText placeholder="Search" type="text" @change="search" v-model="text"></InputText>        
  </div>


                    

</template>

<script>
  import InputText from 'primevue/inputtext';
  import {useRoute} from 'vue-router';
  import {computed} from 'vue';
  import Button from 'primevue/button';

  export default {
    name: 'SearchInput',
    data: () => ({
      text: '',
      path: null
    }),
    mounted(){
      const route = useRoute();
      this.path = computed(() =>route.path);
    },
    components: {
      InputText
    },
    methods: {
      search() {
        let text = this.text;
        this.text = '';
        let path = this.path == '' || this.path == null || this.path == '/' ? '/sanctions/persons/list' : this.path;
        console.log(path);
        this.$router.push({ path: path, query: { search: text } }); 
      },
      clear(){
        this.text = '';
        let text = this.text;
        this.$router.push({ path: this.path, query: { search: text } });
      }
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
</style>