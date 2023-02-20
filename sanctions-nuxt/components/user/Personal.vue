<template>
    <div class="flex-column">
      <h2>Info</h2>
      <Textarea v-model="profile.info" :autoResize="true" rows="5" cols="30" class="border-blue-500 w-full"/>
      <div class="flex justify-content-end flex-wrap py-2">
        <Button label="Save" class="p-button-info" @click="update()"/>
      </div>
    </div>
</template>

<script>
  import Button from 'primevue/button'
  import { useProfileStore } from '@/store/profiles'
  import { computed, ref, onMounted } from 'vue';
  import { useContext } from '@nuxtjs/composition-api'
  import Textarea from 'primevue/textarea'

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
    components: { Button, Textarea },
  }
</script>

