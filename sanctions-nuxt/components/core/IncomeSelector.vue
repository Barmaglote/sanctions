<template>
  <Dropdown v-model="income" :options="incomes" optionLabel="name" placeholder="Select class" @change="$emit('input', income?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		income: null,
  		incomes: [
  			{name: 'Poor', code: '0'},
  			{name: 'Low-middle', code: '1'},
  			{name: 'Middle', code: '2'},
  			{name: 'Upper-middle', code: '3'},
  			{name: 'Rich', code: '4'},
  		]
  	}
  },
  components: {
    Dropdown
  }
}
</script>
