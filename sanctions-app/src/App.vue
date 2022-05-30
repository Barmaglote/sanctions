<template>
	<div class="menu-bar">
		<Menubar :model="items">
			<template #start>
         <div class="title-container">
				  <img alt="logo" src="/fotos/logo.png" height="40" class="mr-2 logo" @click="home">
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
import { useMenuStore } from './stores/menu';
import MenuService from './service/MenuService';
import ScrollTop from 'primevue/scrolltop';

export default defineComponent({
  name: 'App',
  data() {
    return {
      menuStore: null,
      menuService: null
    }
  }, 
  computed: {
     items(){
        return this.menuStore?.menu;
     }
  }, 
  components: {SearchInput, Menubar, ScrollTop},
  mounted() {
   this.menuStore = new useMenuStore();  
   this.menuService = new MenuService();    
   this.menuService.getMenu().then(data => this.menuStore.setMenu(data));
  },
  methods:{
    home(){
      this.$router.push({ path: "/" });
    }
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

.p-menubar{
   border: none !important;
   border-radius: 0 !important;
}

.logo {
  cursor: pointer;
}

.title-container{
  display:flex; 
  align-items: center;
  font-weight: 700;
  padding-right: 1em;
  padding-left: 1em;
}
</style>