<template>
  <Dropdown v-model="place" :options="places" optionLabel="name" placeholder="How many people in your area" @change="$emit('input', place?.code)"/>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
  data() {
  	return {
  		place: null,
  		places: [
  			{name: 'Less 1000', code: '1000'},
  			{name: '1 001 - 10 0000', code: '10000'},
  			{name: '10 001 - 100 000', code: '100000'},
  			{name: '100 001 - 1 000 000', code: '1000000'},
  			{name: '1 000 001 - 10 000 000', code: '10000000'},
        {name: "10 000 001+", code: '10000000+'}
  		]
  	}
  },
  components: {
    Dropdown
  }
}
</script>
