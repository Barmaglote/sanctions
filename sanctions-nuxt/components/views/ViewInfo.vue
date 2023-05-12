<template>
  <div class="flex justify-content-center cursor-pointer h-3rem border-round-2xl bg-gray-100 align-items-center px-2" @click="$emit('click')" >
    <div class="w-1rem text-base font-semibold text-600">{{ total | shortNumber }}</div>
    <eye-outline fillColor="#2196F3" class="flex flex-wrap align-content-center"></eye-outline>
  </div>
</template>

<script>
  import EyeOutline from 'vue-material-design-icons/EyeOutline.vue';

  export default {
    components: { EyeOutline },
    props: {
      total: {
        type: Number,
        default: () => 0
      }
    }
  }
</script>
