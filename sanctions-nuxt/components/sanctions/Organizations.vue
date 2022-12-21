<template>
	<div class="card">
		<DataView :value="items" @page="onPage($event)" ref="table" :layout="layout" :paginator="true" :lazy="true" :rows="5" :totalRecords="totalRecords" :loading="loading">			
		   <template #header>
			   <div class="grid grid-nogutter">
				   <div class="lg:col-6" style="text-align: left">
					   <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Evil" @change="onSortChange($event)"/>
				   </div>
				   <div class="lg:col-6" style="text-align: right; white-space: nowrap;">					
					   <DataViewLayoutOptions v-model="layout" />
				   </div>
			   </div>
		   </template>

		   <template #list="slotProps">
			   <div class="col-12">
				   <div class="element-list-item">
					   <img v-if="slotProps.data.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${slotProps.data.foto}`" class="photo-list" :alt="slotProps.data.titleeng"/>
					   <img v-else src="/fotos/firma.png" :alt="slotProps.data.titleeng" class="photo-list photo-default"/>
					   <div class="element-list-detail">
						   <div class="element-name">{{slotProps.data.titleeng}}</div>
						   <div class="element-name-rus">{{slotProps.data.titlerus}}</div>
						   <div class="element-description">{{slotProps.data.description}}</div>
						   <Rating v-model="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
						   <i class="pi pi-tag element-category-icon"></i><span class="element-category">{{getTagNames(slotProps.data.tag)}}</span>
					   </div>
					   <div class="element-list-action">
					   </div>
				   </div>
			   </div>
		   </template>

		   <template #grid="slotProps">
			   <div class="col-12 md:col-4 display-grid">
				   <div class="element-grid-item card">
					   <div class="element-grid-item-top">
						   <div>
							   <i class="pi pi-tag element-category-icon"></i>
							   <span class="element-category">{{getTagNames(slotProps.data.tag)}}</span>
						   </div>
						   <span class="element-badge">{{slotProps.data.dob}}</span>
					   </div>
					   <div class="element-grid-item-content">
					   <img v-if="slotProps.data.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${slotProps.data.foto}`" class="photo-grid" :alt="slotProps.data.titleeng"/>
					   <img v-else src="/fotos/firma.png" :alt="slotProps.data.titleeng" class="photo-grid photo-default"/>
						   <div class="element-name">{{slotProps.data.titleeng}}</div>
						   <div class="element-name-rus">{{slotProps.data.titlerus}}</div>
						   <div class="element-description">{{slotProps.data.description}}</div>
						   <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
					   </div>
					   <div class="element-grid-item-bottom">
					   </div>
				   </div>
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
  import IconGender from "@/components/icons/IconGender.vue"
  import { useTagsStore } from '@/store/tags'
  import { computed, onMounted, ref, watch } from 'vue'
  import TagHelper from '@/models/tag.helper'
  import { useContext } from '@nuxtjs/composition-api'

  export default {
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, IconGender }, 
    props: {
      search: {
        type: String,
        default: null,
      }
    },	
    setup(props) {
		const { $fetchOrganizations } = useContext()
		const tagsStore = useTagsStore()
		const sortKey = ref(null)
		const sortOrder = ref(-1)
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

		const lazyLoadOrganizations = () => {
			loading.value = true;

			filters.value.tags.value = ''
			const tags = tagsStore.Selected.map(x => x.key) 
			if (tags && tags.length > 0) {
				filters.value.tags.value = tags;
			}

			lazyParams.value.filters = filters.value

			$fetchOrganizations(lazyParams).then(data => {
				items.value = data.data.result
				totalRecords.value = data.data.total
				loading.value = false
			})
		}		

		const onPage = (event) => {
            lazyParams.value = event;
			lazyParams.value.sortField = sortField.value
			lazyParams.value.sortOrder = sortOrder.value

            lazyLoadOrganizations();
        }

		onMounted(() => {
			lazyParams.value = {
            	first: 0,
            	rows: table.value.rows,
            	sortField:  sortField.value,
            	sortOrder: sortOrder.value,
            	filters: filters.value
        	};

			tagHelper.value = new TagHelper(tagsStore.tags)
			lazyLoadOrganizations();
		});

        const onSortChange = (event) => {
			lazyParams.value.sortOrder = event.value.value 
			sortOrder.value = event.value.value

			lazyLoadOrganizations()
        }

		const getTagNames = (keys) => {
			return tagHelper.value.getTagNames(keys)
		}		

		const WEB_STATIC_FILES = computed(() => {
			return process.env.WEB_STATIC_FILES;
		})

		tagsStore.$subscribe(() => {
			if (loading.value) return;
			lazyLoadOrganizations()
		})

		watch(() => props.search, (newValue, oldValue) => {
      		if (newValue != oldValue) {
				filters.value.title = props.search
				lazyLoadPersons()
			}
    	});

		return { items, tagsStore, table, totalRecords, loading, onPage, onSortChange, getTagNames, WEB_STATIC_FILES, sortKey, sortOrder, sortField, layout, sortOptions }
    },
  }
</script>


<style lang="scss" scoped>
	.photo-grid {
		max-width: 15em;
		height: 100%;
		box-shadow: none !important;
	}
	
	.photo-list{
		max-width: 12em;
		height: 100%;
		box-shadow: none !important;
	}
	
	.p-dataview-header .grid {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-evenly;
		align-items: center;
	}
	
	.display-grid{	
		display: grid;
	}
	
	.p-dataview-layout-options {
		box-shadow: none;
	}
	
	.p-dropdown {
		width: 14rem;
		font-weight: normal;
	}
	
	.element-name {
		font-size: 1.5rem;
		font-weight: 700;
	}
	
	.element-name-rus {
		font-size: 1.1rem;
		font-weight: 400;
	}
	
	.element-description {
		margin: 0 0 1rem 0;
	}
	
	.element-category-icon {
		vertical-align: middle;
		margin-right: .5rem;
	}
	
	.element-category {
		font-weight: 600;
		vertical-align: middle;
	}
	
	.card{
		box-shadow: none;
		border-radius: 0.375rem;
		border: 1px solid #e5e7eb;
		padding: 1rem;
	}
	
	::v-deep(.p-dataview .p-dataview-header){
		border: none;
		background: none;
	}
	
	
	::v-deep(.element-list-item) {
		display: flex;
		align-items: center;
		padding: 1rem;
		width: 100%;
	
		img {
			width: 50px;
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
			margin-right: 2rem;
		}
	
		.element-list-detail {
			flex: 1 1 0;
		}
	
		.p-rating {
			margin: 0 0 .5rem 0;
		}
	
		.element-gender {
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: .5rem;
			align-self: flex-end;
		}
	
		.element-list-action {
			display: flex;
			flex-direction: column;
		}
	
		.p-button {
			margin-bottom: .5rem;
		}
	}
	
	::v-deep(.element-grid-item) {
		margin: .5rem;
		border: 1px solid var(--surface-border);
	
		.element-grid-item-top,
		.element-grid-item-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	
		img {
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
			margin: 2rem 0;
		}
	
		.element-grid-item-content {
			text-align: center;
		}
	
		.element-gender {
			font-size: 1.5rem;
			font-weight: 600;
		}
	}
	
	@media screen and (max-width: 600px) {
		.p-dropdown {
			width: 100%;
			font-weight: normal;
		}		
		.element-list-item {
			flex-direction: column;
			align-items: center;
	
			img {
				margin: 2rem 0;
			}
	
			.element-list-detail {
				text-align: center;
			}
	
			.element-gender {
				align-self: center;
			}
	
			.element-list-action {
				display: flex;
				flex-direction: column;
			}
	
			.element-list-action {
				margin-top: 2rem;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				width: 100%;
			}
		}
	}
	</style>
	
	
	