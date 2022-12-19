<template>
    <div class="surface-ground">          
        <div class="col-12 md:col-12 p-0">
          <bg-links :items="filtered" :subtitle="subtitle"></bg-links>
        </div>                            
    </div>              
</template>

<script>
import Links from "@/components/sanctions/Links.vue";
import { useRoute } from '@nuxtjs/composition-api';
import { computed } from 'vue';
import { useLinksStore } from '@/store/links';
import { LINKS_QUERY } from '@/queries/links';
import { storeToRefs } from 'pinia';
import { FilterList } from '@/common/Filters';

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
    async asyncData({ app }) {
      const client = app.apolloProvider.defaultClient;
      const res = await client.query({
        query: LINKS_QUERY,
      })

      const linksStore = useLinksStore();
      linksStore.setLinks(res.data?.links);
    },    
    setup() {      
      const route = useRoute()
		  const type = computed(() => route.value.params.type)
      const search = computed(() => route.value.params.search)
      const subtitle = 'media';
      const linksStore = useLinksStore();

      const { Links } = storeToRefs(linksStore);
      const filtered = computed(() => FilterList(Links.value, type.value, search.value, ['titlerus', 'titlerus']) );

      return { filtered, subtitle }
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