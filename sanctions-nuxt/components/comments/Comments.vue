<template>
	<div class="card">
    	<DataView :value="comments" @page="onPage($event)" ref="table" :layout="layout" :paginator="true" :lazy="true" :rows="50" :totalRecords="totalRecords" :loading="loading">
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
					<bg-comment :comment="slotProps.data" view="item"></bg-comment>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4">
					<bg-comment :comment="slotProps.data" view="card"></bg-comment>
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
  import { onMounted, ref } from 'vue'
  import Comment from "@/components/comments/Comment.vue"

  export default {
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, 'bg-comment': Comment }, 
    props: {
      comments: {
        type: [],
        default: () => [],
      }
    },	
    setup({ comments }) {
		const sortKey = ref(null)
		const sortOrder = ref('desc')
		const sortField = ref('rating')
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

		const lazyLoadComments = () => {
			loading.value = true;
		}

		const onPage = (event) => {
            lazyParams.value = event;
			lazyParams.value.sortField = sortField.value
			lazyParams.value.sortOrder = sortOrder.value

            lazyLoadComments();
        }

		onMounted(() => {
			lazyParams.value = {
            	first: 0,
            	rows: table?.value?.rows,
            	sortField:  sortField.value,
            	sortOrder: sortOrder.value,
            	filters: filters.value
        	};

			lazyLoadComments();
		});

        const onSortChange = (event) => {
			lazyParams.value.sortOrder = event.value.value 
			sortOrder.value = event.value.value			

			lazyLoadComments();
        }
		return { comments, table, totalRecords, loading, onPage, onSortChange, sortKey, sortOrder, sortField, layout, sortOptions }
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


