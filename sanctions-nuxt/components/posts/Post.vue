<template>
	<div class="flex flex-wrap p-4 bg-white">
    <div v-if="post">
      <div v-if="view === 'preview' && post && post._id">
        <h2><nuxt-link :to="{ path: `/posts/${post?._id}` }">{{ post.title }}</nuxt-link></h2>
        <div v-html="post.preview"></div>
        <div class="flex justify-content-between flex-wrap pt-3">
          <div class="flex">
            <bg-likes :reputation-object-id="post._id" :isLikingLocked="false" :reputation-object-type="'pos'"></bg-likes>
            <bg-comment-info :total="post.commentsTotal" class="ml-2"></bg-comment-info>
          </div>
        </div>
      </div>
      <div v-if="view === 'full' && post && post._id">
        <h2><nuxt-link :to="{ path: `/posts/${post?._id}` }">{{ post.title }}</nuxt-link></h2>
        <div v-html="post.post"></div>
        <div class="flex justify-content-between flex-wrap pt-3">
          <div class="flex">
            <bg-likes :reputation-object-id="post._id" :isLikingLocked="false" :reputation-object-type="'pos'"></bg-likes>
            <bg-comment-info :total="post.commentsTotal" class="ml-2"></bg-comment-info>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!post">
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton height="4rem" class="mb-2"></Skeleton>
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton height="4rem" class="mb-2"></Skeleton>
    </div>
	</div>
</template>

<script>
  import Skeleton from 'primevue/skeleton/Skeleton';
  import Likes from "@/components/likes/Likes.vue";
  import CommentInfo from '@/components/comments/CommentInfo.vue';

  export default {
	  components: {
      Skeleton,
      'bg-likes': Likes,
      'bg-comment-info': CommentInfo
    },
    setup({ post }) {
		  return { post }
    },
    props: {
      post: {
        type: Object,
        default: {}
      },
      view: {
        type: String,
        default: 'preview',
        required: true,
        validator(value) {
          return ['preview', 'full'].includes(value)
        }
      }
    }
  }
</script>

