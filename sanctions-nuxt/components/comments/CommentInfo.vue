<template>
  <div class="flex justify-content-center cursor-pointer" @click="$emit('click')" >
    <div class="w-1rem text-base font-semibold">{{ total | shortNumber }}</div>
    <comment-text-outline fillColor="#FF0000"></comment-text-outline>
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
