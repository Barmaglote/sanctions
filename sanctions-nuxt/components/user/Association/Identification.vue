<template>
  <div class="w-full">
    <div class="w-full">
      Please, provide documents confirming your authentity
     </div>
    <FileUpload name="files[]" url="./upload" :maxFileSize="1000000" :fileLimit="3" @select="fileSelected" accept="image/*">
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button/Button';
import { ref } from 'vue';

export default {
  setup(_,{emit}){

    const files = ref([])

    const fileSelected = (event) => {
      emit('updateStatus', { files: event.files });
    }

    return { fileSelected, files }
  },
  components: {
    FileUpload, Button
  }
}
</script>
