<template>
  <div class="flex justify-content-center cursor-pointer h-3rem align-items-center flex-wrap bg-gray-100 px-2 border-round-2xl" @click="$emit('click')" >
    <div class="w-1rem text-base font-semibold text-600">{{ total | shortNumber }}</div>
    <comment-text-outline fillColor="#2196F3" class="flex flex-wrap align-content-center"></comment-text-outline>
  </div>
</template>

<script>
  import CommentTextOutline from 'vue-material-design-icons/CommentTextOutline.vue';

  export default {
    components: { CommentTextOutline },
    props: {
      total: {
        type: Number,
        default: () => 0
      }
    }
  }
</script>
