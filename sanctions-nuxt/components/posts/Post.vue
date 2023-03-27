<template>
	<div class="flex flex-wrap p-4 bg-white">
    <h2>{{ post.title }}</h2>
    <div v-html="post.preview">
    </div>
	</div>
</template>

<script>
  export default {
	  components: {     },
    setup({ post }) {

		return { post }
    },
    props: {
      post: {
        type: Object,
        default: {}
      }
    }
  }
</script>

