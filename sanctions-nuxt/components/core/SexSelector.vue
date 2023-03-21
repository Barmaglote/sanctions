<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex1" name="sex" value="mal" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="sex1" class="my-0">Male</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex2" name="sex" value="fem" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="sex2" class="my-0">Female</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex3" name="sex" value="nbi" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="sex3" class="my-0">Non-binary</label>
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
