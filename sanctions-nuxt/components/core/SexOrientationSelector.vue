<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="orientation1" name="sex" value="1" v-model="orientation" />
      <label for="orientation1" class="my-0">Straight</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="orientation2" name="sex" value="2" v-model="orientation" />
      <label for="orientation2" class="my-0">LGBTQ+</label>
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
      orientation: null
    }
  },
}
</script>
