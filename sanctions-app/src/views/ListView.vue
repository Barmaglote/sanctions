<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">        
    <div class="col-3 md:col-3">
      <div class="card px-3 py-3">
          <TagSelector></TagSelector>
      </div>
    </div>                        
    <div class="col-9 md:col-9">
          <Persons :items="items" :search="search"></Persons>
    </div>                            
  </div>              
</template>

<script>
  import Persons from "./../components/Persons.vue";
  import TagSelector from "./../components/TagSelector.vue";

  export default {
    name: "ListView",
    components: { Persons, TagSelector }, 
    props: {
      search: {
        type: String,
        default: null,
      }
    },
  }
</script>

<style>
.surface-ground {
  display: flex;  
}
</style>