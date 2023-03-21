<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion1" name="religion" value="ath" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion1" class="my-0">Ahteist</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion2" name="religion" value="agn" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion2" class="my-0">Agnostic</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion3" name="religion" value="mus" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion3" class="my-0">Muslim</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion4" name="religion" value="chr" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion4" class="my-0">Christian</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion4" name="religion" value="bud" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion4" class="my-0">Buddist</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion5" name="religion" value="oth" v-model="childValue" @change="$emit('input', childValue)"/>
      <label for="religion5" class="my-0">Other</label>
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
