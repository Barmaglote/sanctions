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
      {name: 'Poor', code: 'i0'},
  		{name: 'Low-middle', code: 'i1'},
  		{name: 'Middle', code: 'i2'},
  		{name: 'Upper-middle', code: 'i3'},
  		{name: 'Rich', code: 'i4'},
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
