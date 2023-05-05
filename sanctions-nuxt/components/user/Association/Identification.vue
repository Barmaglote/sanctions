<template>
  <div class="w-full">
    <div class="w-full">
      Please, provide documents confirming your authentity
      {{profile.userId}}
    </div>
    <FileUpload name="file" :url="'http://localhost:5000/api/upload/profile/authentity/'+ profile.userId" :maxFileSize="1000000" :fileLimit="3" @select="fileSelected" accept="image/*">
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button/Button';
import { onMounted, computed } from 'vue';
import { useProfileStore } from '@/store/profiles';


export default {
  setup(_,{emit}){
    const profilesStore = useProfileStore();

    onMounted(() => {
      if (!profilesStore?._id) {
      profilesStore.fetchPrivateProfile();
    }
    });

		const profile = computed(() => {
			return profilesStore?.Profile;
		});

    const fileSelected = (event) => {
      emit('updateStatus', { files: event.files });
    }

    return { fileSelected, profile }
  },
  components: {
    FileUpload, Button
  }
}
</script>
