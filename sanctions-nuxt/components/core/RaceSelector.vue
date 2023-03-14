<template>
  <div class="flex w-full flex-row justify-content-between">
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race1" name="race" value="fl" v-model="race" @change="$emit('input', race)" />
      <label for="race1" class="m-0">Asian</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race2" name="race" value="lf" v-model="race" @change="$emit('input', race)" />
      <label for="race2" class="m-0">Black</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race3" name="race" value="ct" v-model="race" @change="$emit('input', race)" />
      <label for="race3" class="m-0">Latinos</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race4" name="race" value="rt" v-model="race" @change="$emit('input', race)" />
      <label for="race4" class="m-0">White</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race5" name="race" value="fr" v-model="race" @change="$emit('input', race)" />
      <label for="race5" class="m-0">Red</label>
    </div>
    <div class="field-radiobutton flex align-items-center flex-wrap flex-column">
      <RadioButton inputId="race5" name="race" value="fr" v-model="race" @change="$emit('input', race)" />
      <label for="race5" class="m-0">Metis</label>
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
      race: null
    }
  },
}
</script>
