<template>
  <div class="w-full">
    <div v-if="like.reputationObjectType === 'per'">

      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Person <nuxt-link class="font-semibold underline" :to="{ path: `/reputation/person/${like?.reputationObject?._id}` }">{{ like.reputationObject.titleeng }}</nuxt-link> <span class="">{{formatDate(like?.createdAt)}}</span>
    </div>
    <div v-if="like.reputationObjectType === 'com'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Comment by <nuxt-link class="font-semibold underline" :to="{ path: `/user/profiles/${like?.reputationObject?.author?._id}` }">{{ like.reputationObject.author.username }}</nuxt-link> <span class="">{{formatDate(like?.createdAt)}}</span>
      <div class="w-full p-5 border-left-2 border-yellow-500 m-2">{{ like.reputationObject.comment }}</div>
    </div>
    <div v-if="like.reputationObjectType === 'org'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Organization {{ like.reputationObject.titleEng }} <span class="">{{formatDate(like?.createdAt)}}</span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/models/date.helper'
  import Panel from 'primevue/panel';
  export default {
    components: {
      Panel
    },
    setup({ like }) {
      return { like, formatDate }
    },
    props: {
      like: {
        type: Object,
        default: () => null,
      },
    }
  }
</script>
