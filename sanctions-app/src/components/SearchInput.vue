<template>
  <div>
    <InputText placeholder="Search" type="text" @change="search" v-model="text"></InputText>
  </div>
</template>

<script>
  import InputText from 'primevue/inputtext';

  export default {
    name: 'SearchInput',
    data: () => ({
      text: '',
    }),
    components: {
      InputText
    },
    methods: {
      search() {
          this.$router.push({ path: '/list', query: { search: this.text } })
      },
    },
  }
</script>