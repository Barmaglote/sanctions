<template>
  <Dropdown v-model="childValue" :options="options" optionLabel="name" :filter="true" placeholder="Select" :showClear="true" @change="$emit('input', childValue?.code)">
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
import { onMounted, ref } from 'vue';

export default {
  setup({value}) {

    let childValue = ref(null);
    const options = ref([
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
    ]);

    const placeholder = ref("Select");

    onMounted(( ) => {
      if (!value) { return }
      const founded = options.value.filter((x) => x.code === value);
      if (founded && founded.length > 0) {
        childValue.value = founded[0];
      }
    });
    return { options, childValue, placeholder }
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  components: {
    Dropdown
  }
}
</script>
