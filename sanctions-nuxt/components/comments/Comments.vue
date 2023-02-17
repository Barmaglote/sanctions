<template>
	<div class="card">
    	<DataView :value="comments" @page="onPage($event)" ref="table" :layout="layout" :paginator="true" :lazy="true" :rows="10" :totalRecords="total" :loading="loading">
			<template #header>
        <div class="grid grid-nogutter">
        	<div class="lg:col-6" style="text-align: left">Comments</div>
        	<div class="lg:col-6 view-selector" style="text-align: right;">
          		<DataViewLayoutOptions v-model="layout" />
        	</div>
        </div>
			</template>

			<template #list="slotProps">
				<div class="w-full px-2">
					<bg-comment :comment="slotProps.data" view="item" :reputation-object-id="reputationObjectId"></bg-comment>
          <div v-if="slotProps.data?.comments?.length > 0" class="ml-5 p-2">
          	<div v-for="comment in slotProps.data?.comments">
          		<bg-comment :comment="comment" view="item" class="border-left-2 border-yellow-500 m-2" :reputation-object-id="reputationObjectId"></bg-comment>
          	</div>
          </div>
          <div v-if="currentParentCommentID !== slotProps.data.id && isLogged" class="p-2 flex">
            <Button label="Add a comment" class="p-button-text" icon="pi pi-plus" @click="currentParentCommentID = slotProps.data.id"/>
          </div>-
					<bg-add-comment
            class="py-2 ml-5 p-0"
            v-if="isLogged && slotProps.data.id === currentParentCommentID"
            :reputation-object-id="reputationObjectId"
            :parentId="slotProps.data.id" @submit="lazyLoadComments"></bg-add-comment>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4">
					<bg-comment :comment="slotProps.data" view="card" :reputation-object-id="reputationObjectId"></bg-comment>
				</div>
			</template>
		</DataView>
	</div>
</template>

<script>
  import DataView from 'primevue/dataview'
  import Rating from 'primevue/rating'
  import Dropdown from 'primevue/dropdown'
  import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
  import { ref, toRefs, computed } from 'vue'
  import Comment from "@/components/comments/Comment.vue"
  import AddComment from "@/components/comments/AddComment.vue"
  import { useContext } from '@nuxtjs/composition-api'
  import Button from 'primevue/button'
  import Likes from "@/components/likes/Likes.vue"

  export default {
	  components: {
      DataView, Rating, Dropdown, DataViewLayoutOptions, Button,
      'bg-comment': Comment,
      'bg-add-comment': AddComment,
      'bg-likes': Likes
    },
    props: {
      comments: {
        type: [],
        default: () => [],
      },
      total: {
        type: Number,
        default: () => 0,
      },
      reputationObjectId: {
        type: String,
        default: () => null,
      },
    },
    emits: ['submit'],
    setup(props, ctx) {
		  const sortKey = ref(null)
		  const sortOrder = ref(-1)
		  const sortField = ref('createdAt')
		  const loading = ref(false)
		  const layout = ref('list')
		  const currentParentCommentID = ref(null)
		  const lazyParams = ref({})
   	  const table = ref(null)
      const comment = ref('')

   	  const { $auth } = useContext()
   	  const isLogged = computed(() => $auth.loggedIn )

		  const lazyLoadComments = () => {
		  	loading.value = true
      	ctx.emit('submit', lazyParams)
  	  }

		  const onPage = (event) => {
      	lazyParams.value = event;
		  	lazyParams.value.sortField = sortField.value
		  	lazyParams.value.sortOrder = sortOrder.value
      	lazyLoadComments();
    	}

    	const { comments, total, reputationObjectId } = toRefs(props)

		  return {  comments, table, sortKey, sortOrder, sortField, layout, reputationObjectId, isLogged,
                total, currentParentCommentID, comment, loading, onPage, lazyLoadComments }
    },
	  watchQuery: true,
  }
</script>


<style lang="scss" scoped>
.p-dataview-layout-options {
	box-shadow: none;
}

.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

@media screen and (max-width: 600px) {
	.p-dropdown {
	    width: 100%;
	    font-weight: normal;
	}
}

::v-deep(.p-dataview .p-dataview-header){
	border: none;
	background: none;
}

.p-dataview-header .grid {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
}

::v-deep(.person-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.person-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.person-gender {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.person-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.person-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.person-grid-item-top,
	.person-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 5em;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.person-grid-item-content {
		text-align: center;
	}

	.person-gender {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.person-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.person-list-detail {
			text-align: center;
		}

		.person-gender {
			align-self: center;
		}

		.person-list-action {
			display: flex;
			flex-direction: column;
		}

		.person-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}

.sub-comment  {
  border: 1px solid silver;
}
</style>


