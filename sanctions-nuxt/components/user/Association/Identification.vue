<template>
  <div class="stepsdemo-content">
    <Card>
      <template #title>
          Identification
      </template>
      <template #subtitle>
          Enter your personal information
      </template>
      <template #content>
        <div class="p-fluid">
          temp
        </div>
      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <i></i>
          <Button label="Next" @click="nextPage(!$v.$invalid)" icon="pi pi-angle-right" iconPos="right" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button/Button';

export default {
  components: {
    Card, Button
  },
  methods: {
    nextPage(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
          return;
      }
      this.$emit('nextPage', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 0});
    }
  }
}
</script>
