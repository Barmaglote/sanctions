<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2">
    <div class="lg:col-3 md:col-3">
      <div class="tags-card" v-if="tags && tags.length > 0">
        <bg-tag-selector :items="tags"/>
      </div>
    </div>
    <div class="lg:col-9 md:col-9 col-12">
        <bg-organizations :search="search" class="shadow-1"/>
    </div>
  </div>
</template>

<script>
  import Organizations from "@/components/sanctions/Organizations.vue"
  import TagSelector from "@/components/core/TagSelector.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed } from 'vue'
  import TAGS_QUERY from '@/queries/tags.gql'

  export default {
    apollo: {
      tags: {
        prefetch: true,
        query: TAGS_QUERY,
        variables () {
          return { area: "organizations" }
        }
      }
    },
    head() {
      return {
        title: process.env.SITE_TITLE + " | Sanctions: Organizations",
        meta: [
          {
            hid: 'sanctions_organizations',
            name: 'List of proposed for sanctions organizations',
            content: 'My custom description' // TODO
          }
        ]
      }
	  },
    components: {
      'bg-organizations': Organizations,
      'bg-tag-selector':TagSelector
    },
    setup() {
      const route = useRoute()
      let search = computed(() => route.value.query.search)

      return { search }
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
