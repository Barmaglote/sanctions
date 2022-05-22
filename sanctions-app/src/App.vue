<template>
	<div class="menu-bar">
		<Menubar>
			<template #start>
        <div class="title-container">
				  <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">
          <h3>Sanctions</h3>
        </div>
			</template>
			<template #end>
				<SearchInput></SearchInput>
			</template>
		</Menubar>
	</div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from './components/SearchInput.vue'
import Menubar from 'primevue/menubar';
import { usePersonsStore } from './stores/persons';
import { useTagsStore } from './stores/tags';
import PersonsService from './service/PersonsService';
import TagService from './service/TagService';

export default defineComponent({
  name: 'App',
  data() {
    return {
      personsStore: null,
      personsService: null,
      tagsStore: null,
      tagService: null,      
    }
  },  
  components: {SearchInput, Menubar},
  mounted() {
    this.personsStore = usePersonsStore();
    this.tagsStore = useTagsStore();
    this.personsService = new PersonsService();
    this.tagService = new TagService();

    this.personsService.getPersons().then(data => this.personsStore.setPersons(data));
    this.tagService.getTagNodes().then(data => this.tagsStore.setTags(data));
  }
});
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.menu-bar{
  position: sticky;
}

.title-container{
  display:flex; 
  align-items: center;
}
</style>