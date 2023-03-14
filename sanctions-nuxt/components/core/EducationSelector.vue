<template>
  <Dropdown v-model="education" :options="educations" optionLabel="name" placeholder="Select your education" @change="$emit('input', education?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		education: null,
  		educations: [
  			{name: 'No formal education', code: 'none'},
  			{name: 'Primary education', code: 'prime'},
  			{name: 'Secondary education or high school', code: 'second'},
  			{name: 'GED', code: 'ged'},
  			{name: 'Vocational qualification', code: 'vocation'},
        {name: "Bachelor's degree", code: 'barchelor'},
        {name: "Master's degree", code: 'master'},
        {name: 'Doctorate or higher', code: 'doctor'}
  		]
  	}
  },
  components: {
    Dropdown
  }
}
</script>
