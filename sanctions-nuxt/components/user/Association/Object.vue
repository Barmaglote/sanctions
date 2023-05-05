<template>
  <div class="w-full">
    <div class="w-full">
      <h2 v-if="state.type === 'person'">Person</h2>
      <h2 v-if="state.type === 'organization'">Organization</h2>
    </div>
    <div class="w-full" v-if="state.isNew">
      <InputText type="text" v-model="titleeng" placeholder="Title" @change="changeTitle($event)"/>
    </div>
    <div class="w-full" v-if="!state.isNew">
      <div class="w-full">
        <AutoComplete v-model="selectedObject" :suggestions="filteredObjects" @complete="search($event)" field="titleeng" class="w-full" :scrollHeight="'600px'" @item-select="itemSelect($event)">
          <template #item="slotProps">
            <div class="grid p-2 flex border-1 border-100 w-full">
              <div class="col-2 flex flex-wrap justify-content-center align-content-center" v-if="slotProps?.item?.foto">
		            <img :alt="slotProps.item.titleeng" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${slotProps?.item.foto}`" class="w-5rem h-5rem" v-if="state.type === 'person'"/>
                <img :alt="slotProps.item.titleeng" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${slotProps?.item.foto}`" class="w-5rem h-5rem" v-if="state.type === 'organization'"/>
              </div>
              <div class="col-2 flex flex-wrap justify-content-center align-content-center" v-if="!slotProps?.item?.foto">
                <img :src="'/fotos/'+ slotProps?.item?.gender + '-user-icon.png'" :alt="slotProps?.item?.titleeng" class="w-5rem h-5rem" v-if="state.type === 'person'"/>
                <img :src="'/fotos/firma.png'" :alt="slotProps?.item?.titleeng" class="w-5rem h-5rem" v-if="state.type === 'organization'"/>
              </div>
              <div class="col-10 flex flex-wrap align-content-center">
                <div class="flex flex-wrap w-full font-semibold">{{slotProps.item.titleeng}}</div>
                <div class="flex flex-wrap white-space-normal">{{slotProps.item.description}}</div>
              </div>
            </div>
	        </template>
        </AutoComplete>
      </div>
    </div>
    <div class="w-full" v-if="selectedObject">
      <div class="p-2 flex border-1 border-400 mt-5">
        <div class="col-2 flex flex-wrap justify-content-center align-content-center" v-if="selectedObject.foto">
		      <img :alt="selectedObject.titleeng" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${selectedObject.foto}`" class="w-5rem h-5rem" v-if="state.type === 'person'"/>
          <img :alt="selectedObject.titleeng" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${selectedObject.foto}`" class="w-5rem h-5rem" v-if="state.type === 'organization'"/>
        </div>
        <div class="col-2 flex flex-wrap justify-content-center align-content-center" v-if="!selectedObject.foto">
          <img :src="'/fotos/'+ selectedObject.gender + '-user-icon.png'" :alt="selectedObject.titleeng" class="w-5rem h-5rem" v-if="state.type === 'person'"/>
          <img :src="'/fotos/firma.png'" :alt="selectedObject.titleeng" class="w-5rem h-5rem" v-if="state.type === 'organization'"/>
        </div>
        <div class="col-10 flex flex-wrap align-content-center">
          <div class="flex flex-wrap w-full font-semibold">{{selectedObject.titleeng}}</div>
          <div class="flex flex-wrap white-space-normal">{{selectedObject.description}}</div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button/Button';
import Dropdown from 'primevue/dropdown';
import AutoComplete from 'primevue/autocomplete';
import { useContext } from '@nuxtjs/composition-api';
import { onMounted, ref, computed } from 'vue';
import InputText from 'primevue/inputtext';


export default {
  setup( { state }, { emit } ) {

		const selectedObject = ref(null);
    const { $fetchOrganizations, $fetchPersons } = useContext();
    const filteredObjects = ref(null);
		const sortOrder = ref(-1)
		const sortField = ref('rating')
		const loading = ref(false)
		const totalRecords = ref(0)
		const lazyParams = ref({})

		onMounted(() => {
			lazyParams.value = {
        first: 0,
        rows: 50,
        sortField: sortField.value,
        sortOrder: sortOrder.value,
        filters: filters.value
      };
		});

		const filters = ref({
      'title': {value: '', matchMode: 'contains'},
    })

    const titleeng = ref(null)

		const filterOrganizations = (title) => {
      if (loading.value) return;
			loading.value = true;

			filters.value.title = title
			lazyParams.value.filters = filters.value

			$fetchOrganizations(lazyParams).then(data => {
				filteredObjects.value = data.data.result
				totalRecords.value = data.data.total
				loading.value = false
			})
		}

		const filterPersons = (title) => {
      if (loading.value) return;
			loading.value = true;

      filters.value.title = title
			lazyParams.value.filters = filters.value

			$fetchPersons(lazyParams).then(data => {
				filteredObjects.value = data.data.result
				totalRecords.value = data.data.total
				loading.value = false
			})
		}

		const search = (event) => {
      if (state.type === 'person') {
        filterPersons(event.query);
      }

      if (state.type === 'organization') {
        filterOrganizations(event.query);
      }
		}

    const WEB_STATIC_FILES = computed(() => {
			return process.env.WEB_STATIC_FILES
		})

    const itemSelect = (event) => {
      emit('updateStatus', {reputationObject: event.value});
    }

    const changeTitle = (event) => {
      emit('updateStatus', {reputationObject: {titleeng: titleeng.value}});
    }

    return { state, selectedObject, filteredObjects, search, WEB_STATIC_FILES, itemSelect, titleeng, changeTitle }
  },
  props: {
    state: {
      type: Object,
      default: {}
    }
  },
  components: {
    Card, Button, Dropdown, AutoComplete, InputText
  }
}
</script>
