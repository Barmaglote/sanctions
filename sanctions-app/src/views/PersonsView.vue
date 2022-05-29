<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">        
    <div class="col-3 md:col-3">
      <div class="tags-card">
          <PersonsTagSelector></PersonsTagSelector>
      </div>
    </div>                        
    <div class="col-9 md:col-9">
          <Persons :items="items" :search="search"></Persons>
    </div>                            
  </div>              
</template>

<script>
  import Persons from "./../components/Persons.vue";
  import PersonsTagSelector from "./../components/PersonsTagSelector.vue";
  import { usePersonsStore } from './../stores/persons';
  import { useTagsStore } from './../stores/tags';
  import PersonsService from './../service/PersonsService';
  import TagService from './../service/TagService';

  export default {
    name: "PersonsView",
    components: { Persons, PersonsTagSelector }, 
    data() {
        return {
            useTagsStore: null,
            usePersonsStore: null,
            tagService: null,
            personsService: null,
        }
    },
    created() {
		  this.usePersonsStore = usePersonsStore();
      this.personsService = new PersonsService();   
      this.personsService.getPersons().then(data => this.usePersonsStore.setPersons(data));

      this.tagService = new TagService();
      this.useTagsStore = useTagsStore();
      this.tagService.getTagNodes('persons').then(data => this.useTagsStore.setTags(data));
    },
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
    width: inherit;
    padding: 0 1.5em 0 0 !important;
}
</style>