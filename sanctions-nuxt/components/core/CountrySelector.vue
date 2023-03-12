<template>
  <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" :filter="true" placeholder="Select a Country" :showClear="true">
      <template #value="slotProps">
          <div class="country-item country-item-value flex align-items-center" v-if="slotProps.value">
              <div :class="'w-2rem h-2rem px-2 flag-' + slotProps.value.code.toLowerCase()" />
              <div class="px-2">{{slotProps.value.name}}</div>
          </div>
          <span v-else>
              {{slotProps.placeholder}}
          </span>
      </template>
      <template #option="slotProps">
          <div class="country-item flex align-items-center">
              <div :class="'w-2rem h-2rem px-2 flag-' + slotProps.option.code.toLowerCase()" />
              <div class="px-2">{{slotProps.option.name}}</div>
          </div>
      </template>
  </Dropdown>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      selectedCountry: null,
      countries: [
        {name: 'Australia', code: 'AU'},
        {name: 'Brazil', code: 'BR'},
        {name: 'China', code: 'CN'},
        {name: 'Egypt', code: 'EG'},
        {name: 'France', code: 'FR'},
        {name: 'Russia', code: 'RU'},
        {name: 'Italy', code: 'IT'},
        {name: 'Germany', code: 'DE'},
        {name: 'India', code: 'IN'},
        {name: 'Japan', code: 'JP'},
        {name: 'Spain', code: 'ES'},
        {name: 'United States', code: 'US'}
      ]
    }
  },
}
</script>
