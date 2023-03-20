<template>
  <div>
    <Dropdown v-model="education" :options="educations" optionLabel="name" placeholder="Select" @change="$emit('input', education?.code)"/>
  </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { onMounted, ref } from 'vue';

export default {
  setup({value}) {

    let education = ref(null);
    const educations = ref([
  		{name: 'No formal education', code: 'non'},
  		{name: 'Primary education', code: 'prm'},
  		{name: 'Secondary education or high school', code: 'snd'},
  		{name: 'GED', code: 'ged'},
  		{name: 'Vocational qualification', code: 'voc'},
      {name: "Bachelor's degree", code: 'bsc'},
      {name: "Master's degree", code: 'msc'},
      {name: 'Doctorate or higher', code: 'phd'}
  	]);


    onMounted(( ) => {
      if (!value) { return }
      const founded = educations.value.filter((x) => x.code === value);
      if (founded && founded.length > 0) {
        education.value = founded[0];
      }
    });
    return { educations, education }
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
