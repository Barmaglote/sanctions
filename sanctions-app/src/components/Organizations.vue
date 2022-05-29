<template>
 <div class="card">
    <DataView :value="filtered" :layout="layout" :paginator="true" :rows="50" :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Evil" @change="onSortChange($event)"/>
                    </div>
                    <div class="col-6" style="text-align: right">					
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
					<div class="element-list-item">
						<img v-if="slotProps.data.foto" :src="`/fotos/sanctions/organizations/${slotProps.data.foto}`" class="photo-list" :alt="slotProps.data.titleeng"/>
						<img v-else src="/fotos/noname.png" :alt="slotProps.data.titleeng"/>
						<div class="element-list-detail">
							<div class="element-name">{{slotProps.data.titleeng}}</div>
							<div class="element-name-rus">{{slotProps.data.titlerus}}</div>
							<div class="element-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
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
						<img v-if="slotProps.data.foto" :src="`/fotos/sanctions/organizations/${slotProps.data.foto}`" class="photo-grid" :alt="slotProps.data.titleeng"/>
						<img v-else src="/fotos/noname.png" :alt="slotProps.data.titleeng"/>
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
  import DataView from 'primevue/dataview';
  import Rating from 'primevue/rating';
  import Dropdown from 'primevue/dropdown';
  import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
  import IconGender from "./icons/IconGender.vue";
  import { useOrganizationsStore } from './../stores/organizations';
  import { useTagsStore } from './../stores/tags';

  export default {
	name: "Organizations",
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, IconGender }, 
    data() {
        return {
			organizationsStore: null,
			tagsStore: null,
            layout: 'list',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Evil High to Low', value: '!rating'},
                {label: 'Evil Low to High', value: 'rating'},
            ]
        }
    },
    props: {
      search: {
        type: String,
        default: null,
      }
    },	
    created() {
		this.organizationsStore = useOrganizationsStore();
		this.tagsStore = useTagsStore();
    },
    methods: {
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
		getTagNames(keys){

			if (!keys) return "";
			if (!this.tagsStore.tags) return "";

			let tagNames = [];
			let self = this;

			keys.forEach(key => {
				self.tagsStore.tags.forEach(x => {
					x.children.forEach(y => {
						if (y.key == key) {
							tagNames.push(y.label);
						}
					});
				});
			});

			return tagNames.join(", ");
		}
    },
    computed: {
      filtered() {

		if (!this.search && this.tagsStore.selected.length == 0) {
          return this.organizationsStore.organizations;
        };

        let filtered = JSON.parse(JSON.stringify(this.organizationsStore.organizations));
		
		if (this.search) {
        	let filterVal = this.search.trim().toLowerCase().split(/\s+/)
        	let filterBy = [ 'titlerus', 'titleeng' ]
			filtered = filtered.filter(item => filterBy.some(prop => filterVal.some(val => item[prop].toLowerCase().includes(val))));
		}
	
		if (this.tagsStore.selected.length) {
			filtered = filtered.filter(x => x.tag.some(tag => this.tagsStore.selected.some(sel => sel.key == tag)));
		}

        return filtered
      }
    },	
  }
</script>


<style lang="scss" scoped>
.photo-grid {
	width: 8em;
	height: 100%;
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

@media screen and (max-width: 576px) {
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


