<template>
  <div class="surface-ground px-1 py-1 md:px-1 lg:px-2 p-grid">
    <div class="col-6 col-offset-3">
      <bg-person :person="person" class="card_shadow" :tags="tags"></bg-person>
      <bg-add-comment class="card_shadow" v-if="isLogged" :reputation-object-id="id" @submit="refetch"></bg-add-comment>
      <bg-comments :comments="comments" class="card_shadow" v-if="comments && comments?.length > 0" :total="commentsTotal" @submit="refetch"></bg-comments>
    </div>
  </div>
</template>

<script>
  import Person from "@/components/persons/Person.vue"
  import Comments from "@/components/comments/Comments.vue"
  import AddComment from "@/components/comments/AddComment.vue"
  import { useRoute } from '@nuxtjs/composition-api'
  import { computed, ref } from 'vue'
  import PERSON_QUERY from '@/queries/person.gql'
  import TAGS_QUERY from '@/queries/tags.gql'
  import COMMENTS_QUERY from '@/queries/comments.gql'
  import { useContext } from '@nuxtjs/composition-api'

  export default {
    apollo: {
      person: {
        prefetch: true,
        query: PERSON_QUERY,
        variables () {
          return { _id: this.id }
        },
      },
      tags: {
        prefetch: true,
        query: TAGS_QUERY,
        variables () {
          return { area: "persons" }
        }
      },
      comments: {
        prefetch: true,
        query: COMMENTS_QUERY,
        variables () {
          let lazyLoadEvent = this.lastLazyLoadEvent?.value ||
          {
            sortField: null,
            sortOrder: null,
            first: 0,
            rows: 10,
            filters: null
          }

          return {
            reputationObjectId: this.id,
            lazyLoadEvent
          }
        }
      },
      commentsTotal: {
        prefetch: true,
        query: COMMENTS_QUERY,
        variables () {
          return {
            reputationObjectId: this.id
          }
        }
      },
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
      'bg-person': Person,
      'bg-comments': Comments,
      'bg-add-comment': AddComment
    },
    setup() {
      const route = useRoute()
      const id = computed(() => route.value.params.id)
      const { $auth } = useContext()
      const isLogged = computed(() => $auth.loggedIn )
      const lastLazyLoadEvent = ref({
        sortField: null,
        sortOrder: null,
        first: 0,
        rows: 10,
        filters: null
      })

      return { id, isLogged, lastLazyLoadEvent }
    },
    methods: {
      refetch(lazyParams) {
        if (lazyParams?.value) {
          const { sortField, sortOrder, first, rows } = lazyParams.value
          this.lastLazyLoadEvent.value = {
            filters: null,
            sortField, sortOrder, first, rows
          }

          this.$apollo.queries.comments.refresh()
          this.$apollo.queries.commentsTotal.refresh()
        } else {
          this.$apollo.queries.comments.refetch()
          this.$apollo.queries.commentsTotal.refetch()
        }
      }
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
