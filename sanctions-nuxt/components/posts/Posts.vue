<template>
	<div class="card">
    	<DataView :value="items" @page="onPage($event)" ref="table" :layout="layout" :paginator="true" :lazy="true" :rows="50" :totalRecords="totalRecords" :loading="loading">
			<template #header>
        <div class="grid grid-nogutter">
          <div class="lg:col-6" style="text-align: left">
            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Evil" @change="onSortChange($event)"/>
          </div>
          <div class="lg:col-6 view-selector" style="text-align: right;">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
					<bg-post :post="slotProps.data" view="item" :isLikingLocked="true" :view="'preview'"></bg-post>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-6">
					<bg-post :post="slotProps.data" view="card" :isLikingLocked="false"></bg-post>
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
  import { onMounted, ref, watch } from 'vue'
  import { useContext } from '@nuxtjs/composition-api'
  import Post from "@/components/posts/Post.vue"

  export default {
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, 'bg-post': Post },
    props: {
      search: {
        type: String,
        default: null,
      },
      authorId: {
        type: String,
        default: null
      }
    },
    setup(props) {
		const { $getPosts } = useContext()
		const sortKey = ref(null)
		const sortOrder = ref('desc')
		const sortField = ref('rating')
		const items = ref([])
		const loading = ref(false)
		const totalRecords = ref(0)
		const layout = ref('list')
		const lazyParams = ref({})
		const sortOptions = ref([
      {label: 'Evil High to Low', value: -1},
      {label: 'Evil Low to High', value: 1},
    ])
		const filters = ref({
      'title': {value: '', matchMode: 'contains'},
			'tags': {value: '', matchMode: 'in'},
    })

		const table = ref(null)
		// TODO: regex against INJECTIONS

		if (props.search) {
			filters.value.title = props.search
		}

		const lazyLoadPosts = () => {
			loading.value = true;
			lazyParams.value.filters = filters.value

			$getPosts(props.authorId, lazyParams.value).then(data => {
				items.value = data.data.posts
				totalRecords.value = data.data.postsTotal
				loading.value = false
			})
		}

		const onPage = (event) => {
      lazyParams.value = event;
			lazyParams.value.sortField = sortField.value
			lazyParams.value.sortOrder = sortOrder.value

      lazyLoadPosts();
    }

		onMounted(() => {
			lazyParams.value = {
        first: 0,
        rows: table?.value?.rows,
        sortField:  sortField.value,
        sortOrder: sortOrder.value,
        filters: filters.value
      };

			lazyLoadPosts();
    });

    const onSortChange = (event) => {
		  lazyParams.value.sortOrder = event.value.value
		  sortOrder.value = event.value.value
		  lazyLoadPosts();
    }

		watch(() => props.search, (newValue, oldValue) => {
      if (newValue != oldValue) {
				filters.value.title = props.search
				lazyLoadPosts()
			}
    });

		return { items, table, totalRecords, loading, onPage, onSortChange, sortKey, sortOrder, sortField, layout, sortOptions }
    },
	watchQuery: true
  }
</script>
