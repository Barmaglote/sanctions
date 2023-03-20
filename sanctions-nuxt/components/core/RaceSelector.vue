<template>
  <div class="flex w-full flex-row justify-content-between">
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race1" name="race" value="asn" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race1" class="m-0">Asian</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race2" name="race" value="blk" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race2" class="m-0">Black</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race3" name="race" value="lat" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race3" class="m-0">Latinos</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race4" name="race" value="wht" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race4" class="m-0">White</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race5" name="race" value="red" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race5" class="m-0">Red</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race5" name="race" value="met" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="race5" class="m-0">Metis</label>
    </div>
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';
import { ref } from 'vue';

export default {
  components: {
    RadioButton
  },
  setup({value}) {
    const childValue = ref(value);
    return { childValue }
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
}
</script>
