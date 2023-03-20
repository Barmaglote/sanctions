<template>
  <Dropdown v-model="childValue" :options="options" optionLabel="name" :placeholder="placeholder" @change="$emit('input', childValue?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';

export default {
  setup({value}) {

    let childValue = ref(null);
    const options = ref([
      {name: 'Intern', code: 'int'},
  		{name: 'Specialist', code: 'spc'},
  		{name: 'Lead/Senior specialist', code: 'led'},
  		{name: 'Manager', code: 'man'},
  		{name: 'Top-manager', code: 'top'},
      {name: 'Business owner', code: 'own'},
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
