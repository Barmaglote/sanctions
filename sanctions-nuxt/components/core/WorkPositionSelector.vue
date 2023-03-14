<template>
  <Dropdown v-model="position" :options="positions" optionLabel="name" placeholder="Select position" @change="$emit('input', position?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		position: null,
  		positions: [
  			{name: 'Intern', code: '0'},
  			{name: 'Specialist', code: '1'},
  			{name: 'Lead/Senior specialist', code: '2'},
  			{name: 'Manager', code: '3'},
  			{name: 'Top-manager', code: '4'},
        {name: 'Business owner', code: '5'},
  		]
  	}
  },
  components: {
    Dropdown
  }
}
</script>
