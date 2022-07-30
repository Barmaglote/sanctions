<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">        
    <div class="lg:col-3 md:col-3">
      <div class="tags-card">
          <OrganizationsTagSelector></OrganizationsTagSelector>
      </div>
    </div>                        
    <div class="lg:col-9 md:col-9 col-12">
          <Organizations :search="search"></Organizations>
    </div>                            
  </div>              
</template>

<script>
  import Organizations from "./../components/Organizations.vue";
  import OrganizationsTagSelector from "./../components/OrganizationsTagSelector.vue";
  import { useOrganizationsStore } from './../stores/organizations';
  import { useTagsStore } from './../stores/tags';
  import TagService from './../service/WebAPI/TagService';  
  import OrganizationsService from '../service/WebAPI/organizations.service';  

  export default {
    name: "OrganizationsView",
    components: { Organizations, OrganizationsTagSelector }, 
    data() {
        return {
            useTagsStore: null,
            useOrganizationsStore: null,
            tagService: null,
            organizationsService: null,
        }
    },    
    created() {
		  this.useOrganizationsStore = useOrganizationsStore();
      this.organizationsService = new OrganizationsService();   
      this.organizationsService.getOrganizations().then(data => this.useOrganizationsStore.setOrganizations(data));

      this.tagService = new TagService();
      this.useTagsStore = useTagsStore();
      this.tagService.getTagNodes('organizations').then(data => this.useTagsStore.setTags(data));      
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

@media screen and (max-width: 576px) {
.tags-card {	
    display: none;
  }
}
</style>