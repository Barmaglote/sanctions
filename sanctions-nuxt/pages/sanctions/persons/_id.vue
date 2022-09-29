<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">        
    <div class="lg:col-3 md:col-3">
      <div class="tags-card">
        <bg-tag-selector/>
      </div>
    </div>                        
    <div class="lg:col-9 md:col-9 col-12">
        <bg-persons :search="search"></bg-persons>
    </div>                            
  </div>              
</template>

<script>
  import Persons from "@/components/sanctions/Persons.vue"
  import TagSelector from "@/components/core/TagSelector.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed } from 'vue'

  export default {    
    head() {
      return {
        title: process.env.SITE_TITLE + " | Sanctions: Persons",
        meta: [
          {
            hid: 'sanctions_persons',
            name: 'List of proposed for sanctions persons',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },         
    components: { 
      'bg-persons': Persons, 
      'bg-tag-selector': TagSelector 
    },
    setup() {
      const route = useRoute()
		  let id = computed(() => route.value.params.id)
      let search = computed(() => route.value.query.search)

      return { id, search }
    }
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