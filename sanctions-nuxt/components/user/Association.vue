<script setup>
  import Steps from 'primevue/steps';
  import Type from '@/components/user/Association/Type.vue'
  import Identification from '@/components/user/Association/Identification.vue'
  import Person from '@/components/user/Association/Person.vue'
  import Confirmation from '@/components/user/Association/Confirmation.vue'
  import Avatar from 'primevue/avatar';

  import { ref } from 'vue'

  const steps = {
    Type,
    Person,
    Identification,
    Confirmation
  }

</script>
<template>
  <div class="flex-row flex p-0 align-content-center flex-wrap justify-content-center">
    <div class="w-full h-auto flex justify-content-around">
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="1" size="large" shape="circle"></Avatar></div>
        <div class="">Type</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="2" size="large" shape="circle"></Avatar></div>
        <div class="">Person</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="3" size="large" shape="circle"></Avatar></div>
        <div class="">Identity</div>
      </div>
      <div class="flex align-items-center flex-wrap flex-column gap-2">
        <div class=""><Avatar label="4" size="large" shape="circle"></Avatar></div>
        <div class="">Confirm</div>
      </div>
    </div>
    <div class="py-5 w-full">
      <component :is="steps['Type']" @nextPage="changeStep()"></component>
    </div>
  </div>
</template>

<script>
  export default {
    setup() {

      const current = ref('Type')
      const changeStep = ( event ) => {
        console.log("test")
      }

      return { current, changeStep }
    },
    components: {
      Type,
      Identification,
      Person,
      Confirmation,
      Steps
    }
  }
</script>

