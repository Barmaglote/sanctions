<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children1" name="children" value="1" v-model="children" />
      <label for="children1" class="my-0">0</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children2" name="children" value="2" v-model="children" />
      <label for="children2" class="my-0">1</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="children3" name="children" value="3" v-model="children" />
      <label for="children3" class="my-0">2+</label>
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
      children: null
    }
  },
}
</script>
