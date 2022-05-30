<template>
 <div class="">
    <DataView :value="filtered" :layout="layout" :paginator="true" :rows="50" :sortOrder="sortOrder" :sortField="sortField">
			<template #grid="slotProps">
				<div class="col-12 md:col-4 display-grid">
					<div class="element-grid-item">
						<div class="element-grid-item-content">
							<img v-if="slotProps.data.foto" :src="`/fotos/links/${slotProps.data.foto}`" class="photo-list" :alt="slotProps.data.titleeng"/>
							<img v-else src="/fotos/noname.png" :alt="slotProps.data.titleeng"/>
							<div class="element-name">{{slotProps.data.titleeng}}</div>
							<div class="element-description">{{slotProps.data.description}}</div>
							<div class="element-link"><a :href="`${slotProps.data.link}`" target="_blank">{{slotProps.data.link}}</a></div>
						</div>
					</div>
				</div>
			</template>
		</DataView>
	</div>
</template>

<script>
  import DataView from 'primevue/dataview';
  import { useLinksStore } from './../stores/links';

  export default {
	name: "Links",
	components: { DataView }, 
    data() {
        return {
			linksStore: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: 'titleeng',
			country: null,
			type: null
        }
    },
    props: {
      search: {
        type: String,
        default: null,
      }
    },	
    created() {
		this.linksStore = useLinksStore();
    },
    computed: {
      filtered() {


        if (!this.search) {
          return this.linksStore.links.filter(x => x.type == 'charity');
        };

        let filtered = JSON.parse(JSON.stringify(this.linksStore.links)).filter(x => x.type == 'charity');
		
		if (this.search) {
        	let filterVal = this.search.trim().toLowerCase().split(/\s+/)
        	let filterBy = [ 'titlerus', 'titleeng' ]			
			filtered = filtered.filter(item => filterBy.some(prop => filterVal.some(val => item[prop].toLowerCase().includes(val))));
		}

        return filtered
      }
    },	
  }
</script>


<style lang="scss" scoped>
.photo-list {
	max-width: 13em;
	max-height: 5em;
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
	/*border: 1px solid var(--surface-border);*/

	.element-grid-item-top,
	.element-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		margin: 2rem 0;
	}

	.element-grid-item-content {
		text-align: center;
		padding: 2em
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


