<template>
  <div class="w-full">
    <div class="w-full">
      Please, provide documents confirming your authentity
    </div>
    <FileUpload name="file" :url="'http://localhost:5000/api/upload/profile/authentity/'+ profile.userId" :maxFileSize="1000000" :fileLimit="3" accept="image/*" @upload="upload">
      <template #empty>
        <p v-if="!isUploaded">Drag and drop files to here to upload.</p>
        <p v-if="isUploaded">You files are uploaded.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button/Button';
import { onMounted, computed, ref } from 'vue';
import { useProfileStore } from '@/store/profiles';


export default {
  setup(_,{emit}){
    const profilesStore = useProfileStore();

    onMounted(() => {
      if (!profilesStore?._id) {
      profilesStore.fetchPrivateProfile();
      }
    })

    const isUploaded = ref(false)

		const profile = computed(() => {
			return profilesStore?.Profile;
		});

    const upload = () => {
      isUploaded.value = true;
      emit('updateStatus', { isUploaded: true });
    }

    return { profile, upload, isUploaded }
  },
  components: {
    FileUpload, Button
  }
}
</script>
