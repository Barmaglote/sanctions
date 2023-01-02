<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-4 col-offset-4">
      <bg-person :person="person"></bg-person>
    </div>
  </div>              
</template>

<script>
  import Person from "@/components/persons/Person.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed } from 'vue'
  import PERSON_QUERY from '@/queries/person.gql'


  export default {  
    apollo: {
      person: {
        prefetch: true,
        query: PERSON_QUERY,
        variables () {
          return { _id: this.id }
        }
      }
    },        
    head() {
      return {
        title: process.env.SITE_TITLE + " | Sanctions: Persons",
        meta: [
          {
            hid: 'sanctions_person',
            name: 'Profile of person: ' + this.id,
            content: 'My custom description' // TODO
          }
        ]
      }
	  },         
    components: { 
      'bg-person': Person
    },
    setup() {
      const route = useRoute()
      const id = computed(() => route.value.params.id)

      return { id }
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