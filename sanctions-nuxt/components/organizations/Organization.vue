<template>
	<div class="w-full">
    <div class="card mb-1 p-0 w-full" v-if="!organization?.titleeng">
      <div class="col-2 flex justify-content-center">
        <Skeleton shape="circle" size="50px" class="photo-list photo-default" />
      </div>
      <div class="col-10 flex justify-content-start flex-wrap">
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton height="4rem" class="mb-2"></Skeleton>
      </div>
    </div>
    <div v-if="organization?.titleeng && organization !== null" class="grid w-full mb-1 p-0 flex">
      <div class="col-2 flex flex-wrap justify-content-center align-items-center">
	     <img v-if="organization?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/organizations/${organization.foto}`" class="photo-list max-w-5rem max-h-5rem" :alt="organization.titleeng"/>
	     <img v-else src="/fotos/firma.png" :alt="organization.titleeng" class="photo-list photo-default max-w-5rem max-h-5rem"/>
      </div>
      <div class="col-10">
	      <div class="element-list-detail w-full">
          <div class="flex w-full">
            <div class="col-9">
              <nuxt-link :to="{ path: `/reputation/organizations/${organization._id}` }">
		            <h2 class="p-0 m-0 no-underline hover:underline">{{organization?.titleeng}}</h2>
              </nuxt-link>
		          <div class="text-xl text-semibold">{{organization?.titlerus}}</div>
            </div>
            <div class="col-3 flex justify-content-end">
              <bg-subscribe-button class="ml-2" :reputation-object-id="organization._id" :reputation-object-type="'org'"></bg-subscribe-button>
            </div>
          </div>

          <div class="col-12 flex flex-wrap w-full flex-column">
		    <div class="w-full py-1">{{organization?.description}}</div>
            <div class="flex justify-content-between flex-wrap">
              <div class="flex">
                <bg-likes :reputation-object-id="organization?._id" :isLikingLocked="isLikingLocked" :reputation-object-type="'org'"></bg-likes>
                <bg-comment-info :total="organization.commentsTotal" class="ml-3"></bg-comment-info>
                <bg-subscribers-total :reputation-object-id="organization._id" class="ml-3"></bg-subscribers-total>
                <bg-view-info :total="organization.viewed" class="ml-2"></bg-view-info>
              </div>
              <div class="flex justify-content-end">
                <Rating v-model="organization.rating" :readonly="true" :cancel="false"></Rating>
              </div>
            </div>
            <div v-if="tags && organization?.tag && getTagNames(organization.tag)">
              <i class="pi pi-tag element-category-icon"></i>
              <span class="element-category">{{getTagNames(organization.tag)}}</span>
            </div>
          </div>
	      </div>
      </div>
    </div>
	</div>
</template>

<script>
import TagHelper from '@/models/tag.helper'
import { useTagsStore } from '@/store/tags'
import { onMounted, ref, computed } from 'vue'
import Rating from 'primevue/rating'
import Likes from "@/components/likes/Likes.vue"
import CountryFlag from 'vue-country-flag'
import Skeleton from 'primevue/skeleton';
import ImagePreview from 'primevue/imagepreview';
import CommentInfo from '@/components/comments/CommentInfo.vue';
import SubcribeButton from '@/components/subscribes/SubcribeButton.vue';
import SubscribersTotal from '@/components/subscribes/SubscribersTotal.vue';
import ViewInfo from '@/components/views/ViewInfo.vue';

export default {
	components: { Rating,
    'bg-likes': Likes,
    CountryFlag,
    Skeleton,
    ImagePreview,
    'bg-subscribe-button': SubcribeButton,
    'bg-subscribers-total': SubscribersTotal,
    'bg-comment-info': CommentInfo,
    'bg-view-info': ViewInfo
  },
	setup({ tags }){
    const tagHelper = ref(null)
    const tagsStore = useTagsStore()
    const loading = ref(true)

    if (tags && tags.length > 0) {
			tagsStore.setTags(tags);
		}

		onMounted(() => {
			tagHelper.value = new TagHelper(tagsStore.tags)
		});

		const getTagNames = (keys) => {
			return tagHelper?.value?.getTagNames(keys)
		}

		const WEB_STATIC_FILES = computed(() => {
			return process.env.WEB_STATIC_FILES
		})

    return { getTagNames, WEB_STATIC_FILES, loading, tags }
  },
  props: {
    organization: {
    	type: Object,
    	default: () =>  {},
    },
		view: {
		  type: String,
		  default: 'item'
		},
    reputationObjectId: {
      type: String,
      default: () => null,
    },
	  tags: {
      type: [],
      default: () => [],
    },
    isLikingLocked: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>
