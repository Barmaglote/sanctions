<template>
  <div class="flex w-full flex-row justify-content-between">
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="politic1" name="politic" value="fl" v-model="politic" @change="$emit('input', politic)" />
      <label for="politic1" class="m-0">Far left</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="politic2" name="politic" value="lf" v-model="politic" @change="$emit('input', politic)" />
      <label for="politic2" class="m-0">Left</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="politic3" name="politic" value="ct" v-model="politic" @change="$emit('input', politic)" />
      <label for="politic3" class="m-0">Center</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="politic4" name="politic" value="rt" v-model="politic" @change="$emit('input', politic)" />
      <label for="politic4" class="m-0">Right</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="politic5" name="politic" value="fr" v-model="politic" @change="$emit('input', politic)" />
      <label for="politic5" class="m-0">Far right</label>
    </div>
  </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';

export default {
  components: {
    RadioButton
  },
  data() {
    return {
      politic: null
    }
  },
}
</script>
