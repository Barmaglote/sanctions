<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">        
    <div class="col-3 md:col-3">
      <div class="tags-card">
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

.tags-card {	
    position: fixed;
    padding: 1em !important;
    width: inherit;
    padding: 0 1.5em 0 0 !important;
}
</style>