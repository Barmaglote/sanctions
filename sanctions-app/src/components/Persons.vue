<template>
 <div class="card">
    <DataView :value="filtered" :layout="layout" :paginator="true" :rows="50" :sortOrder="sortOrder" :sortField="sortField">
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
					<div class="person-list-item">
						<img v-if="slotProps.data.foto" :src="`/fotos/sanctions/persons/${slotProps.data.foto}`" class="photo-list" :alt="slotProps.data.titleeng"/>
						<img v-else :src="'/fotos/'+ slotProps.data.gender + '-user-icon.png'" :alt="slotProps.data.titleeng" class="photo-list photo-default" />
						<div class="person-list-detail">
							<div class="person-name">{{slotProps.data.titleeng}}</div>
							<div class="person-name-rus">{{slotProps.data.titlerus}}</div>
							<div class="person-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
							<i class="pi pi-tag person-category-icon"></i><span class="person-category">{{getTagNames(slotProps.data.tag)}}</span>
						</div>
					</div>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4 display-grid">
					<div class="person-grid-item card">
						<div class="person-grid-item-top">
							<div>
								<i class="pi pi-tag person-category-icon"></i>
								<span class="person-category">{{getTagNames(slotProps.data.tag)}}</span>
							</div>
							<span class="person-badge">{{slotProps.data.dob}}</span>
						</div>
						<div class="person-grid-item-content">
							<img v-if="slotProps.data.foto" :src="`/fotos/sanctions/persons/${slotProps.data.foto}`" class="photo-grid" :alt="slotProps.data.titleeng"/>
							<img v-else :src="'/fotos/'+ slotProps.data.gender + '-user-icon.png'" :alt="slotProps.data.titleeng" class="photo-grid photo-default" />
							<div class="person-name">{{slotProps.data.titleeng}}</div>
							<div class="person-name-rus">{{slotProps.data.titlerus}}</div>
							<div class="person-description">{{slotProps.data.description}}</div>
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>
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
  import { usePersonsStore } from './../stores/persons';
  import { useTagsStore } from './../stores/tags';

  export default {
	name: "Persons",
	components: { DataView, Rating, Dropdown, DataViewLayoutOptions, IconGender }, 
    data() {
        return {
			personsStore: null,
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
		this.personsStore = usePersonsStore();
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
          return this.personsStore.persons;
        };

        let filtered = JSON.parse(JSON.stringify(this.personsStore.persons));
		
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
	max-width: 15em;
	height: 100%;
	box-shadow: none !important;
}

.photo-list{
	max-width: 10em;
	height: 100%;
	box-shadow: none !important;	
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

@media screen and (max-width: 600px) {
	.p-dropdown {
	    width: 100%;
	    font-weight: normal;
	}	
}

.person-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.person-name-rus {
	font-size: 1.1rem;
	font-weight: 400;
}

.person-description {
	margin: 0 0 1rem 0;
}

.person-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.person-category {
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


