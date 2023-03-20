<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status1" name="status" value="non" v-model="childValue" @change="$emit('input', childValue)" />
      <label for="status1" class="my-0">None</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status2" name="status" value="prt" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="status2" class="my-0">Part-time</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status3" name="status" value="ful" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="status3" class="my-0">Full-time</label>
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
