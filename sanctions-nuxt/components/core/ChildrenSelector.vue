<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children1" name="children" value="c0" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="children1" class="my-0">0</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children2" name="children" value="c1" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="children2" class="my-0">1</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children3" name="children" value="c2" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="children3" class="my-0">2+</label>
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
