<script setup>
  import Type from '@/components/user/Association/Type.vue'
  import Identification from '@/components/user/Association/Identification.vue'
  import Object from '@/components/user/Association/Object.vue'
  import Confirmation from '@/components/user/Association/Confirmation.vue'
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button/Button';
  import { useContext } from '@nuxtjs/composition-api'
    import { computed, ref, onMounted } from 'vue';
  import { useProfileStore } from '@/store/profiles';

  const current = ref('Type')
  const { $requestAssociation, $toast } = useContext()
  const steps = {
    Type,
    Object,
    Identification,
    Confirmation
  }

  const profilesStore = useProfileStore();

  onMounted(() => {
    if (!profilesStore?._id) {
      profilesStore.fetchPrivateProfile();
    }

    console.log(profilesStore?.Profile)
  });

  const profile = computed(() => {
    return profilesStore?.Profile;
  });

  const sendRequest = () => {
    $requestAssociation(state.value).then(() => {
        $toast.success('Your request is sent');
        //state.value = null;
        ctx.emit('submit');
      },
      () => {
        $toast.error("Unable to send request")
      },
      () => {
        console.log('finished');
      }
    );
  }

  const changeStep = (event) => {
    if (!nextIsAvailable) return;

    switch (current.value) {
      case 'Type':
        current.value = 'Object'
        break;

      case 'Object':
        current.value = 'Identification'
        break;

      case 'Identification':
        current.value = 'Confirmation'
        break;

      case 'Confirmation':
        sendRequest();
        break;
    }
  }

  const state = ref({})

  const updateStatus = (event) => {
    state.value = {
      ...state.value,
      ...event
    }
  }

  const nextIsAvailable = computed(() => {
    if (current.value === 'Type' && state.value.reputationObjectType) return true;
    if (current.value === 'Object' && state.value.reputationObject && state.value.reputationObject.titleeng) return true;
    if (current.value === 'Identification' && state.value.isUploaded) return true;
    if (current.value === 'Confirmation' && state.value.confirmed === true) return true;
    return false;
  })

  const cancel = () => {
    if (current.value === 'Type') {
      state.value.type = null;
    }

    if (current.value === 'Object') {
      state.value.reputationObject = null;
      current.value = 'Type'
    }

    if (current.value === 'Identification') {
      state.value.reputationObject = null;
      current.value = 'Object'
    }

    if (current.value === 'Confirmation') {
      state.value.reputationObject = null;
      current.value = 'Identification'
    }
  }

</script>
<template>
  <div class="flex-row flex p-1 align-content-center flex-wrap justify-content-center bg-white">
    <div class="w-full h-auto flex justify-content-around">
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="1" size="large" shape="circle" :class="{'bg-blue-300 text-100' : current ==='Type'}"></Avatar></div>
        <div :class="{ 'font-semibold': current ==='Type' }">Type</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="2" size="large" shape="circle" :class="{'bg-blue-300 text-100' : current ==='Object'}"></Avatar></div>
        <div :class="{ 'font-semibold': current ==='Object' }">Object</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="3" size="large" shape="circle" :class="{'bg-blue-300 text-100' : current ==='Identification'}"></Avatar></div>
        <div :class="{ 'font-semibold': current ==='Identification' }">Identity</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="4" size="large" shape="circle" :class="{'bg-blue-300 text-100' : current ==='Confirmation'}"></Avatar></div>
        <div :class="{ 'font-semibold': current ==='Confirmation' }">Confirm</div>
      </div>
    </div>
    <div class="py-2 w-full">
      <hr/>
    </div>
    <div class="w-full min-h-40rem h-40rem">
      <component :is="steps[current]" @updateStatus="updateStatus($event)" :state="state"></component>
    </div>
    <div class="py-2 w-full">
      <hr/>
    </div>
    <div class="w-full flex justify-content-end">
      <Button label="Cancel" class="p-button-text mx-2" @click="cancel()"/>
      <Button label="Next" @click="changeStep" :disabled="!nextIsAvailable"></Button>
    </div>
  </div>
</template>
