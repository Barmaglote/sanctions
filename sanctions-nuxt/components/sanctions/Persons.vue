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
					<nuxt-link :to="{ path: `/reputation/person/${slotProps.data._id}` }">
						<bg-person :person="slotProps.data" view="item"></bg-person>
					</nuxt-link>
				</div>
			</template>

			<template #grid="slotProps">
					<nuxt-link :to="{ path: `/reputation/person/${slotProps.data._id}` }" class="col-12 md:col-4">
						<bg-person :person="slotProps.data" view="card"></bg-person>
					</nuxt-link>					
			</template>
		</DataView>
	</div>
</template>

<script>
  import DataView from 'primevue/dataview'
  import Rating from 'primevue/rating'
  import Dropdown from 'primevue/dropdown'
  import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
  import IconGender from "@/components/icons/IconGender.vue"
  import { useTagsStore } from '@/store/tags'
  import { computed, onMounted, ref, watch } from 'vue'
  import TagHelper from '@/models/tag.helper'
  import { useContext } from '@nuxtjs/composition-api'
  import Person from "@/components/persons/Person.vue"

  export default {
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, IconGender, 'bg-person': Person }, 
    props: {
      search: {
        type: String,
        default: null,
      }
    },	
    setup(props) {
		const { $fetchPersons } = useContext()
		const tagsStore = useTagsStore();
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
		const tagHelper = ref(null)

		// TODO: regex against INJECTIONS

		if (props.search) {
			filters.value.title = props.search
		}

		const lazyLoadPersons = () => {
			loading.value = true;

			filters.value.tags.value = ''
			const tags = tagsStore.Selected.map(x => x.key) 

			if (tags && tags.length > 0) {
				filters.value.tags.value = tags;
			}

			lazyParams.value.filters = filters.value		

			$fetchPersons(lazyParams).then(data => {
				items.value = data.data.result
				totalRecords.value = data.data.total
				loading.value = false
			})
		}

		const onPage = (event) => {
            lazyParams.value = event;
			lazyParams.value.sortField = sortField.value
			lazyParams.value.sortOrder = sortOrder.value

            lazyLoadPersons();
        }

		onMounted(() => {
			lazyParams.value = {
            	first: 0,
            	rows: table?.value?.rows,
            	sortField:  sortField.value,
            	sortOrder: sortOrder.value,
            	filters: filters.value
        	};

			tagHelper.value = new TagHelper(tagsStore.tags)
			lazyLoadPersons();
		});

        const onSortChange = (event) => {
			lazyParams.value.sortOrder = event.value.value 
			sortOrder.value = event.value.value			

			lazyLoadPersons();
        }

		const getTagNames = (keys) => {
			return tagHelper.value.getTagNames(keys)
		}

		const WEB_STATIC_FILES = computed(() => {
			return process.env.WEB_STATIC_FILES
		})

		tagsStore.$subscribe(() => {
			if (loading.value) return;
			lazyLoadPersons()
		})

		watch(() => props.search, (newValue, oldValue) => {
      		if (newValue != oldValue) {
				filters.value.title = props.search
				lazyLoadPersons()
			}
    	});

		return { items, tagsStore, table, totalRecords, loading, onPage, onSortChange, getTagNames, WEB_STATIC_FILES, sortKey, sortOrder, sortField, layout, sortOptions }
    },
	watchQuery: true
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
</style>


