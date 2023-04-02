<template>
  <div class="flex justify-content-center cursor-pointer" @click="$emit('click')" >
    <div class="w-1rem text-base font-semibold text-600">{{ total | shortNumber }}</div>
    <comment-text-outline fillColor="#2196F3"></comment-text-outline>
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
