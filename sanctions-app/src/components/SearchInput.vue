<template>
  <div class="p-inputgroup">    
    <InputText placeholder="Search" type="text" @change="search" v-model="text"></InputText>
  </div>
</template>

<script>
  import InputText from 'primevue/inputtext';
  import {useRoute} from 'vue-router';
  import {computed} from 'vue';

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
          if (this.path.startsWith('/sanctions/organizations/list')) {
            this.$router.push({ path: '/sanctions/organizations/list', query: { search: this.text } });
          } else {
            this.$router.push({ path: '/sanctions/persons/list', query: { search: this.text } });
          }
          
      },
    },
  }
</script>