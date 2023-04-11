<template>
  <div class="w-full flex flex-wrap">
    <div class="flex w-full">
      <h2>Type</h2>
    </div>
    <div class="flex w-full">
      <h4>Select type of integration</h4>
    </div>
    <div class="w-full flex justify-content-around flex-wrap gap-6 p-3">
      <div class="w-full flex justify-content-around">
        <Card class="w-20rem cursor-pointer">
          <template #header>
            <div class="w-full align-items-center flex justify-content-center pt-3">
              <Avatar shape="circle" size="xlarge">
                <AccountPlus/>
              </Avatar>
            </div>
          </template>
          <template #title>
            New person
          </template>
          <template #content>
            You are planning to create new public profile. None of existing profiles are not suite you
          </template>
        </Card>
        <Card class="w-20rem cursor-pointer">
          <template #header>
            <div class="w-full align-items-center flex justify-content-center pt-3">
              <Avatar shape="circle" size="xlarge">
                <Account/>
              </Avatar>
            </div>
          </template>
          <template #title>
            Existing person
          </template>
          <template #content>
            Profile already existing. Select this option if you want to take control on it
          </template>
        </Card>
      </div>
      <div class="w-full flex justify-content-around">
        <Card class="w-20rem cursor-pointer">
          <template #header>
            <div class="w-full align-items-center flex justify-content-center pt-3">
              <Avatar shape="circle" size="xlarge">
                <AccountMultiplePlus/>
              </Avatar>
            </div>
          </template>
          <template #title>
            New organization
          </template>
          <template #content>
            Profile already existing. Select this option if you want to take control on it
          </template>
        </Card>
        <Card class="w-20rem cursor-pointer">
          <template #header>
            <div class="w-full align-items-center flex justify-content-center pt-3">
              <Avatar shape="circle" size="xlarge">
                <AccountMultipleOutline/>
              </Avatar>
            </div>
          </template>
          <template #title>
            Existing organization
          </template>
          <template #content>
            Profile already existing. Select this option if you want to take control on it
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card/Card';
import Account from 'vue-material-design-icons/Account.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import AccountMultiplePlus from 'vue-material-design-icons/AccountMultiplePlus.vue';
import AccountMultipleOutline from 'vue-material-design-icons/AccountMultipleOutline.vue';
import Avatar from 'primevue/avatar';

export default {
  components: {
    Card, Account, AccountPlus, AccountMultiplePlus, AccountMultipleOutline, Avatar
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
