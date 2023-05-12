<script setup>
  import Person from '@/components/persons/Person.vue'
  import Organization from '@/components/organizations/Organization.vue'
  import Button from 'primevue/button/Button';
  import { computed, onMounted } from 'vue';
  import { useProfileStore } from '@/store/profiles';

  const profilesStore = useProfileStore();

  onMounted(() => {
    if (!profilesStore?._id) {
      profilesStore.fetchPrivateProfile();
    }
  });

  const profile = computed(() => {
    return profilesStore?.Profile;
  });

</script>
<template>
  <div class="w-full flex flex-wrap">
    <div class="">
      <nuxt-link target="_blank" :to="'/user/association'">
        <Button label="New" class="p-button-raised p-button-rounded p-button-success" />
      </nuxt-link>
    </div>
    <div v-for="association in profile.associations" :key="association.reputationObject._id" class="w-full flex border-1 border-200 my-2 p-2">
      <div class="w-full flex">
        <div class="col-9">
          <div class="p-0" v-if="association.reputationObjectType === 'per'">
			      <Person :person="association.reputationObject" view="item" :isLikingLocked="true"></Person>
          </div>
          <div class="p-0" v-if="association.reputationObjectType === 'org'">
			        <Organization :organization="association.reputationObject" view="card" :isLikingLocked="true"></Organization>
          </div>
        </div>
        <div class="col-3 align-content-between flex-wrap flex border-200 border-1">
          <div class="flex w-full flex-wrap flex-column h-20rem">
            <div>
              <h3>Owner</h3>
            </div>
            <div>
              <nuxt-link target="_blank" :to="'/user/profiles/' + association.owner.profile.userId" class="p-button p-button-raised p-button-rounded">{{ association.owner.profile.nickname }}</nuxt-link>
            </div>
            <div>
              <h3>Assistants</h3>
            </div>
            <div v-for="assistant in association.assistants" :key="assistant.userId" class="w-full flex">
              <nuxt-link target="_blank" :to="'/user/profiles/' + association.owner.profile.userId" class="p-button p-button-raised p-button-rounded">{{ association.owner.profile.nickname }}</nuxt-link>
            </div>
            <div v-if="!association.assistants || association.assistants.length === 0" class="w-full flex">
              Empty
            </div>
          </div>
          <div class="flex justify-content-end gap-2 w-full">
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-: .5em" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
