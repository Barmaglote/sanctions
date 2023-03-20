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
      {name: 'Less 1000', code: 'p0'},
  		{name: '1 001 - 10 0000', code: 'p1'},
  		{name: '10 001 - 100 000', code: 'p2'},
  		{name: '100 001 - 1 000 000', code: 'p3'},
  		{name: '1 000 001 - 10 000 000', code: 'p4'},
      {name: "10 000 001+", code: 'p5'}
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

/*
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		place: null,
  		places: [
  			{name: 'Less 1000', code: 'p0'},
  			{name: '1 001 - 10 0000', code: 'p1'},
  			{name: '10 001 - 100 000', code: 'p2'},
  			{name: '100 001 - 1 000 000', code: 'p3'},
  			{name: '1 000 001 - 10 000 000', code: 'p4'},
        {name: "10 000 001+", code: 'p5'}
  		]
  	}
  },
  components: {
    Dropdown
  }
}
*/
</script>
