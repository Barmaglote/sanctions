<template>
  <div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion1" name="religion" value="atheist" v-model="religion" />
      <label for="religion1" class="my-0">Ahteist</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion2" name="religion" value="agnostic" v-model="religion" />
      <label for="religion2" class="my-0">Agnostic</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion3" name="religion" value="muslim" v-model="religion" />
      <label for="religion3" class="my-0">Muslim</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion4" name="religion" value="buddist" v-model="religion" />
      <label for="religion4" class="my-0">Christian</label>
    </div>
    <div class="field-radiobutton flex align-items-center">
      <RadioButton inputId="religion5" name="religion" value="other" v-model="religion" />
      <label for="religion5" class="my-0">Other</label>
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
      religion: null
    }
  },
}
</script>
