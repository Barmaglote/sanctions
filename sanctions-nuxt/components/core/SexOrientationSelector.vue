<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="orientation1" name="sex" value="srt" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="orientation1" class="my-0">Straight</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="orientation2" name="sex" value="lgb" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="orientation2" class="my-0">LGBTQ+</label>
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
