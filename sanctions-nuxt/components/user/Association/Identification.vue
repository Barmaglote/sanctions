<template>
  <div class="w-full">
    <div class="w-full">
      Please, provide documents confirming your authentity
     </div>
    <FileUpload name="files[]" url="./upload" :maxFileSize="1000000" :fileLimit="3" @select="fileSelected">
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>
  </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button/Button';

export default {
  setup(_,{emit}){
    const fileSelected = () => {
      emit('updateStatus', { files });
    }

    return { fileSelected }
  },
  components: {
    FileUpload, Button
  }
}
</script>
