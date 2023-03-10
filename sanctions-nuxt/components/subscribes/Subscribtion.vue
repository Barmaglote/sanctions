<template>
  <div class="m-0 grid w-full">
    <div class="col-2">
      <Avatar v-if="subscribtion?.reputationObject?.foto" size="large" shape="circle" :image="`${WEB_STATIC_FILES}/fotos/sanctions/${subscribtion.objectType === 'per' ? 'persons' : 'organizations'}/${subscribtion?.reputationObject?.foto}`"/>
      <Avatar v-if="!subscribtion?.reputationObject?.foto" icon="pi pi-user" size="large" shape="circle"/>
    </div>
    <div class="col-7 flex flex-wrap">
      <div class="text-lg">{{ subscribtion.reputationObject?.titleeng }}</div>
      <div class="text-sm">{{ subscribtion.reputationObject?.description }}</div>
    </div>
    <div class="col-3">
      <bg-subcribe-button class="ml-2" :reputation-object-id="subscribtion.reputationObject._id" :reputation-object-type="subscribtion.objectType"></bg-subcribe-button>
    </div>
  </div>
</template>

<script>
  import Avatar from 'primevue/avatar';
  import SubcribeButton from './SubcribeButton.vue';
  import { computed } from 'vue';

  export default {
    components: {
      Avatar,
      'bg-subcribe-button': SubcribeButton,
    },
    setup({subscribtion}){

      const WEB_STATIC_FILES = computed(() => {
		    return process.env.WEB_STATIC_FILES;
	  	});

      return { subscribtion, WEB_STATIC_FILES }
    },
    props: {
      subscribtion: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
