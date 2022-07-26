<template>
  <div class="surface-ground">          
    <div class="col-12 md:col-12 p-0">
          <Links :search="search"></Links>
    </div>                            
  </div>              
</template>

<script>
  import Links from "./../components/Links.vue";
  import { useLinksStore } from './../stores/links';
  import LinksService from './../service/WebAPI/LinksService';

  export default {
    name: "LinksView",
    components: { Links }, 
    data() {
        return {
            useLinksStore: null,
            linksService: null,
        }
    },
    created() {
		  this.useLinksStore = useLinksStore();
      this.linksService = new LinksService();   
      this.linksService.getLinks().then(data => this.useLinksStore.setLinks(data));
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
    padding: 1em !important;
    width: inherit;
    padding: 0 1.5em 0 0 !important;
}
</style>