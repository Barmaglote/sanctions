<template>
    <div class="surface-ground">          
        <div class="col-12 md:col-12 p-0">
            <bg-links :search="search" :type="type"></bg-links>
        </div>                            
    </div>              
</template>

<script>
import Links from "@/components/Links.vue"
import { useRoute } from '@nuxtjs/composition-api'
import { computed } from 'vue'

export default {
    head() {
      return {
        title: process.env.SITE_TITLE + " | Media: " + this.type,
        meta: [
          {
            hid: 'media',
            name: 'Friendly media',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },  
    components: { 'bg-links': Links }, 
    setup() {
      const route = useRoute()
		  let type = computed(() => route.value.params.type)

      return { type }
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