<template>
	<div class="menu-bar">
		<Menubar :model="items">
			<template #start>
        <div class="title-container">
				  <img alt="logo" src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" height="40" class="mr-2">
          <h3>#StopWar</h3>
        </div>
			</template>
			<template #end>
				<SearchInput></SearchInput>
			</template>
		</Menubar>
	</div>
  <router-view></router-view>
  <ScrollTop :threshold="100" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from './components/SearchInput.vue'
import Menubar from 'primevue/menubar';
import { usePersonsStore } from './stores/persons';
import { useTagsStore } from './stores/tags';
import PersonsService from './service/PersonsService';
import TagService from './service/TagService';
import ScrollTop from 'primevue/scrolltop';

export default defineComponent({
  name: 'App',
  data() {
    return {
      personsStore: null,
      personsService: null,
      tagsStore: null,
      tagService: null,      
      items: [
                {
                   label:'Sanctions',
                   icon:'pi pi-fw pi-file',
                   items:[
                      {
                         label:'Persons',
                         icon:'pi pi-fw pi-trash'
                      },
                      {
                         label:'Organizations',
                         icon:'pi pi-fw pi-external-link'
                      }
                   ]
                },
                {
                   label:'Help Ukraine',
                   icon:'pi pi-fw pi-pencil',
                   items:[
                      {
                         label:'Left',
                         icon:'pi pi-fw pi-align-left'
                      },
                      {
                         label:'Right',
                         icon:'pi pi-fw pi-align-right'
                      },
                      {
                         label:'Center',
                         icon:'pi pi-fw pi-align-center'
                      },
                      {
                         label:'Justify',
                         icon:'pi pi-fw pi-align-justify'
                      },

                   ]
                },
                {
                   label:'Help Russia',
                   icon:'pi pi-fw pi-user',
                   items:[
                      {
                         label:'New',
                         icon:'pi pi-fw pi-user-plus',

                      },
                      {
                         label:'Delete',
                         icon:'pi pi-fw pi-user-minus',

                      },
                      {
                         label:'Search',
                         icon:'pi pi-fw pi-users',
                         items:[
                            {
                               label:'Filter',
                               icon:'pi pi-fw pi-filter',
                               items:[
                                  {
                                     label:'Print',
                                     icon:'pi pi-fw pi-print'
                                  }
                               ]
                            },
                            {
                               icon:'pi pi-fw pi-bars',
                               label:'List'
                            }
                         ]
                      }
                   ]
                },
                {
                   label:'Media',
                   icon:'pi pi-fw pi-calendar',
                   items:[
                      {
                         label:'Edit',
                         icon:'pi pi-fw pi-pencil',
                         items:[
                            {
                               label:'Save',
                               icon:'pi pi-fw pi-calendar-plus'
                            },
                            {
                               label:'Delete',
                               icon:'pi pi-fw pi-calendar-minus'
                            },

                         ]
                      },
                      {
                         label:'Archieve',
                         icon:'pi pi-fw pi-calendar-times',
                         items:[
                            {
                               label:'Remove',
                               icon:'pi pi-fw pi-calendar-minus'
                            }
                         ]
                      }
                   ]
                },
                {
                   label:'About',
                   icon:'pi pi-fw pi-power-off'
                }
             ]      
    }
  },  
  components: {SearchInput, Menubar, ScrollTop},
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
  font-weight: 700;
  padding-right: 1em;
  padding-left: 1em;
}
</style>