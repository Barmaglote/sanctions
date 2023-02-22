<template>
  <div class="w-full">
    <div v-if="like.reputationObjectType === 'per'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Person <nuxt-link class="font-semibold underline" :to="{ path: `/reputation/person/${like?.reputationObject?._id}` }">{{ like.reputationObject.titleeng }}</nuxt-link> <span class="">{{like?.createdAt | shortDate}}</span>
      <div class="w-20rem h-10rem p-3 m-2 border-1 border-50 flex align-items-center justify-content-center">
        <div class="w-10rem h-7rem">
          <img v-if="like?.reputationObject?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${like?.reputationObject?.foto}`" class="photo-grid" :alt="like?.reputationObject?.titleeng"/>
		  	  <img v-else :src="'/fotos/'+ like?.reputationObject?.gender + '-user-icon.png'" :alt="like?.reputationObject?.titleeng" class="photo-grid photo-default" />
        </div>
		  	<div class="w-10rem">{{like?.reputationObject?.titleeng}}</div>
      </div>
    </div>
    <div v-if="like.reputationObjectType === 'com'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Comment by <nuxt-link class="font-semibold underline" :to="{ path: `/user/profiles/${like?.reputationObject?.author?._id}` }">{{ like.reputationObject.author.username }}</nuxt-link> <span class="">{{like?.createdAt | shortDate}}</span>
      <div class="w-full p-5 border-left-2 border-yellow-500 m-2">{{ like.reputationObject.comment }}</div>
    </div>
    <div v-if="like.reputationObjectType === 'org'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Organization {{ like.reputationObject.titleEng }} <span class="">{{like?.createdAt | shortDate}}</span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/models/date.helper'
  import Panel from 'primevue/panel';
  import { computed } from 'vue';

  export default {
    components: {
      Panel
    },
    setup({ like }) {

      const WEB_STATIC_FILES = computed(() => {
		    return process.env.WEB_STATIC_FILES;
	  	});

      return { like, formatDate, WEB_STATIC_FILES }
    },
    props: {
      like: {
        type: Object,
        default: () => null,
      },
    }
  }
</script>
