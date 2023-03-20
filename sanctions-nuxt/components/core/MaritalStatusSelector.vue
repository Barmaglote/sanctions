<template>
  <Dropdown v-model="childValue" :options="options" optionLabel="name" placeholder="Select" @change="$emit('input', childValue?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';

export default {
  setup({value}) {

    let childValue = ref(null);
    const options = ref([
      {name: 'Single', code: 's'},
  		{name: 'Married', code: 'm'},
  		{name: 'Divorced/Separated', code: 'd'},
  		{name: 'Widowed', code: 'w'},
  		{name: 'Common-Law/Live-in', code: 'c'},
    ]);

    onMounted(( ) => {
      if (!value) { return }
      const founded = options.value.filter((x) => x.code === value);
      if (founded && founded.length > 0) {
        childValue.value = founded[0];
      }
    });
    return { options, childValue }
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
