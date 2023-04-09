<template>
  <div class="flex justify-content-center cursor-pointer h-3rem border-round-2xl bg-gray-100 align-items-center px-3" @click="$emit('click')" >
    <div class="w-1rem text-base font-semibold text-600">{{ total | shortNumber }}</div>
    <note-outline fillColor="#2196F3" class="flex flex-wrap align-content-center"></note-outline>
  </div>
</template>

<script>
  import NoteOutline from 'vue-material-design-icons/NoteOutline.vue';

  export default {
    components: { NoteOutline },
    props: {
      total: {
        type: Number,
        default: () => 0
      }
    }
  }
</script>
