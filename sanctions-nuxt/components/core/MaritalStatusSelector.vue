<template>
  <Dropdown v-model="status" :options="statuses" optionLabel="name" placeholder="Select status" @change="$emit('input', status?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		status: null,
  		statuses: [
  			{name: 'Single', code: '0'},
  			{name: 'Married', code: '1'},
  			{name: 'Divorced/Separated', code: '2'},
  			{name: 'Widowed', code: '3'},
  			{name: 'Common-Law/Live-in', code: '4'},
  		]
  	}
  },
  components: {
    Dropdown
  }
}
</script>
