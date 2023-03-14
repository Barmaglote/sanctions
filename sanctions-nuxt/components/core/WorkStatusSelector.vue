<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status1" name="status" value="1" v-model="status" @change="$emit('input', status)" />
      <label for="status1" class="my-0">None</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status2" name="status" value="2" v-model="status" @change="$emit('input', status)"/>
      <label for="status2" class="my-0">Part-time</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="status3" name="status" value="3" v-model="status" @change="$emit('input', status)"/>
      <label for="status3" class="my-0">Full-time</label>
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
      status: null
    }
  },
}
</script>
