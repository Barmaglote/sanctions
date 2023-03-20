<template>
  <Dropdown v-model="childValue" :options="options" optionLabel="name" :placeholder="placeholder" @change="$emit('input', childValue?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';

export default {
  setup({value, values, placeholder}) {

    let childValue = ref(null);
    const options = ref(values);

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
    },
    placeholder: {
      type: String,
      default: null
    },
    values: {
      type: Array,
      default: []
    }
  },
  components: {
    Dropdown
  }
}
</script>
