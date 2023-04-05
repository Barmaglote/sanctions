<template>
  <div class="w-full" v-if="like">
    <div v-if="like.reputationObjectType === 'per'" class="flex flex-wrap">
      <div class="grid w-full">
        <div class="col-11">
          User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Person <nuxt-link class="font-semibold hover:underline" :to="{ path: `/reputation/person/${like?.reputationObject?._id}` }">{{ like.reputationObject.titleeng }}</nuxt-link> <span class="">{{like?.createdAt | shortDate}}</span>
        </div>
        <div class="col-1 justify-content-end flex">
          <thumb-up v-if="like.isPositive" class="text-green-500"/>
          <thumb-down v-if="!like.isPositive" class="text-red-500"/>
        </div>
      </div>
      <div class="w-full p-3 m-2 border-50 flex align-items-center justify-content-center border-left-2 border-yellow-500 m-2 grid">
        <div class="col-3 h-7rem align-items-center justify-content-center flex flex-wrap">
          <img v-if="like?.reputationObject?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${like?.reputationObject?.foto}`" class="photo-grid" :alt="like?.reputationObject?.titleeng"/>
		  	  <img v-else :src="'/fotos/'+ like?.reputationObject?.gender + '-user-icon.png'" :alt="like?.reputationObject?.titleeng" class="photo-grid photo-default" />
        </div>
		  	<div class="col-9 flex flex-wrap">
          <div class="w-full"><nuxt-link class="font-semibold hover:underline" :to="{ path: `/reputation/person/${like?.reputationObject?._id}` }">{{like?.reputationObject?.titleeng}}</nuxt-link></div>
          <div class="w-full">{{like?.reputationObject?.description}}</div>
        </div>
      </div>
    </div>

    <div v-if="like.reputationObjectType === 'com'">
      <div class="grid w-full">
        <div class="col-11">
          User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Comment by <nuxt-link class="font-semibold hover:underline" :to="{ path: `/user/profiles/${like?.reputationObject?.author?._id}` }">{{ like.reputationObject.author.username }}</nuxt-link> <span class="">{{like?.createdAt | shortDate}}</span>
        </div>
        <div class="col-1 justify-content-end flex">
          <thumb-up v-if="like.isPositive" class="text-green-500"/>
          <thumb-down v-if="!like.isPositive" class="text-red-500"/>
        </div>
      </div>
      <div class="w-full p-5 border-left-2 border-yellow-500 m-2">{{ like.reputationObject?.comment }}</div>
    </div>

    <div v-if="like.reputationObjectType === 'org'" class="flex flex-wrap">
      <div class="grid w-full">
        <div class="col-11">
          User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Organization <nuxt-link class="font-semibold hover:underline" :to="{ path: `/reputation/organizations/${like?.reputationObject?._id}` }">{{ like.reputationObject.titleeng }}</nuxt-link> <span class="">{{like?.createdAt | shortDate}}</span>
        </div>
        <div class="col-1 justify-content-end flex">
          <thumb-up v-if="like.isPositive" class="text-green-500"/>
          <thumb-down v-if="!like.isPositive" class="text-red-500"/>
        </div>
      </div>
      <div class="w-full p-3 m-2 border-50 flex align-items-center justify-content-center border-left-2 border-yellow-500 m-2 grid">
        <div class="col-3 h-7rem align-items-center justify-content-center flex flex-wrap">
          <div>
            <img v-if="like?.reputationObject?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${like?.reputationObject?.foto}`" class="w-8rem" :alt="like?.reputationObject?.titleeng"/>
		  	    <img v-else :src="'/fotos/firma.png'" :alt="like?.reputationObject?.titleeng" class="w-8rem photo-default" />
          </div>
        </div>
        <div class="col-9 flex flex-wrap">
          <div class="w-full"><nuxt-link class="font-semibold hover:underline" :to="{ path: `/reputation/organizations/${like?.reputationObject?._id}` }">{{like?.reputationObject?.titleeng}}</nuxt-link></div>
          <div class="w-full">{{like?.reputationObject?.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/models/date.helper'
  import Panel from 'primevue/panel';
  import { computed } from 'vue';
  import ThumbDown from 'vue-material-design-icons/ThumbDown.vue';
  import ThumbUp from 'vue-material-design-icons/ThumbUp.vue';


  export default {
    components: {
      Panel, ThumbDown, ThumbUp
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
