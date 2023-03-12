<template>
    <div class="flex-column">
      <h2>Personal</h2>
      <Divider align="left"><h4>Info</h4></Divider>
      <div class="w-full py-1">I discribe myself as</div>
      <Textarea v-model="profile.info" :autoResize="true" rows="5" cols="30" class="border-blue-500 w-full"/>
      <Divider align="left"><h4>Country & Location</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My citizenship</div>
          <div><bg-country-selector class="w-15rem h-3rem align-items-center"></bg-country-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My current location</div>
          <div><bg-country-selector class="w-15rem h-3rem align-items-center"></bg-country-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Sex & Orientation</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Sex</div>
          <div class="w-full p-2"><bg-sex-selector></bg-sex-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Orientation</div>
          <div class="w-full p-2"><bg-sex-orientation-selector></bg-sex-orientation-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Interests</h4></Divider>
      <bg-interests-selector></bg-interests-selector>
      <Divider></Divider>
      <div class="flex justify-content-end flex-wrap py-2">
        <Button label="Save" class="p-button-info" @click="update()"/>
      </div>
    </div>
</template>

<script>
  import Button from 'primevue/button'
  import { useProfileStore } from '@/store/profiles'
  import { computed, onMounted } from 'vue';
  import { useContext } from '@nuxtjs/composition-api'
  import Textarea from 'primevue/textarea'
  import Divider from 'primevue/divider';
  import CountrySelector from '../core/CountrySelector.vue';
  import SexSelector from '../core/SexSelector.vue';
  import SexOrientationSelector from '../core/SexOrientationSelector.vue';
  import InterestsSelector from '../core/InterestsSelector.vue';

  export default {
    setup() {
      const profileStore = useProfileStore()

      const profile = computed(() => {
			  return profileStore?.Profile;
		  })

      let ctx = null;
      onMounted(() => {
        ctx = useContext()
      });

      const update = async () => {
        const { info, userId, nickname } = profile.value
        await profileStore.updateProfile({ info, userId, nickname }, ctx)
      }

      return { profile, profileStore, update }
    },
    components: { Button, Textarea, Divider,
      'bg-country-selector': CountrySelector,
      'bg-sex-selector': SexSelector,
      'bg-sex-orientation-selector': SexOrientationSelector,
      'bg-interests-selector': InterestsSelector
    },
  }
</script>

