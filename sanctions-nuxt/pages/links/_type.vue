<template>
    <div class="border-1 border-300 card p-2 m-2">
        <div class="col-12 md:col-12 p-0">
          <bg-links :items="links" :subtitle="subtitle"></bg-links>
        </div>
    </div>
</template>

<script>
import Links from "@/components/sanctions/Links.vue";
import { useRoute } from '@nuxtjs/composition-api';
import { computed } from 'vue';
import LINKS_QUERY from '~/queries/links.gql';

export default {
    apollo: {
      links: {
        prefetch: true,
        query: LINKS_QUERY,
        variables () {
          return { type: this.$route.params.type }
        }
      }
    },
    head() {
      return {
        title: process.env.SITE_TITLE + " | Links: " + this.type,
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
		  const type = computed(() => route.value.params.type)
      const subtitle = 'links';
      return { type, subtitle }
    }
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
