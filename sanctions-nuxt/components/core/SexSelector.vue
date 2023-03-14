<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex1" name="sex" value="1" v-model="sex" />
      <label for="sex1" class="my-0">Male</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex2" name="sex" value="2" v-model="sex" />
      <label for="sex2" class="my-0">Female</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="sex3" name="sex" value="3" v-model="sex" />
      <label for="sex3" class="my-0">Non-binary</label>
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
      sex: null
    }
  },
}
</script>
