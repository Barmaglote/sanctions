<template>
  <div class="w-screen h-screen z-5 absolute top-0 left-0 right-0 flex justify-content-start align-items-center justify-content-center bg-background-silver">
    <div class="border-round-2xl surface-card w-30rem shadow-4 flex flex-wrap flex-column justify-content-between">
      <div class="flex justify-content-end p-2" @click="$emit('close-modal')">
        <close-circle-outline class="cursor-pointer"></close-circle-outline>
      </div>
      <div class="h-auto p-3">
        <slot></slot>
      </div>
      <div class="justify-content-end p-3 h-5rem flex" v-if="bottomIsVisible">
        <Button label="Submit" icon="pi pi-check" class="p-button-rounded" iconPos="right" />
      </div>
    </div>
  </div>
</template>

<script>
  import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue';
  import Button from 'primevue/button';
  export default {
    components: { CloseCircleOutline, Button },
    props: {
      bottomIsVisible: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #1414142f;
}

.modal {
  background-color: white;
  height: 500px;
  width: 500px;
  border-radius: 20px;
}

.close-img {
  width: 25px;
}

.bg-background-silver {
  background-color: #c0c0c0ab;
}
</style>
