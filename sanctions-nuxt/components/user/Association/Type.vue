<template>
  <div class="w-full flex flex-wrap">
    <div class="w-full flex justify-content-around flex-wrap gap-4 p-3">
      <div class="w-full flex justify-content-around">
        <Card :class="{'w-20rem border-1': true, 'border-blue-400': currentType == 'person' && currentIsNew, 'border-gray-100' : currentType !== 'person' || !currentIsNew }">
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
            <div class="h-full">
              You are planning to create new public profile. None of existing profiles suites
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button icon="pi pi-check" label="Select" @click="setState('person', true)"/>
            </div>
          </template>
        </Card>
        <Card :class="{'w-20rem border-1': true, 'border-blue-400': currentType == 'person' && !currentIsNew, 'border-gray-100' : currentType !== 'person' || currentIsNew }">
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
            <div class="h-full">
              Profile already existing. Select this option if you want to take control on it
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button icon="pi pi-check" label="Select" @click="setState('person', false)"/>
            </div>
          </template>
        </Card>
      </div>
      <div class="w-full flex justify-content-around">
        <Card :class="{'w-20rem border-1': true, 'border-blue-400': currentType == 'organization' && currentIsNew, 'border-gray-100' : currentType !== 'organization' || !currentIsNew }">
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
            <div class="h-full">
            Profile already existing. Select this option if you want to take control on it
            </div>
          </template>
          <template #footer>
            <div class="flex justify-content-end">
              <Button icon="pi pi-check" label="Select" @click="setState('organization', true)"/>
            </div>
          </template>
        </Card>
        <Card :class="{'w-20rem border-1': true, 'border-blue-400': currentType == 'organization' && !currentIsNew, 'border-gray-100' : currentType !== 'organization' || currentIsNew }">
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
          <template #footer>
            <div class="flex justify-content-end">
              <Button icon="pi pi-check" label="Select" @click="setState('organization', false)"/>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'primevue/card/Card';
import Button from 'primevue/button/Button';
import Account from 'vue-material-design-icons/Account.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import AccountMultiplePlus from 'vue-material-design-icons/AccountMultiplePlus.vue';
import AccountMultipleOutline from 'vue-material-design-icons/AccountMultipleOutline.vue';
import Avatar from 'primevue/avatar';
import { ref } from 'vue';

export default {
  setup(_, { emit }){
    const currentType = ref(null);
    const currentIsNew = ref(true);
    const setState = (type, isNew) => {
      currentType.value = type;
      currentIsNew.value = isNew;
      emit('updateStatus', {reputationObjectType: type, isNew});
    }
    return { setState, currentType, currentIsNew }
  },
  components: {
    Card, Button, Account, AccountPlus, AccountMultiplePlus, AccountMultipleOutline, Avatar
  }
}
</script>
