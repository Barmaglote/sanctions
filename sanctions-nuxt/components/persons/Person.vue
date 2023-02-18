<template>
    <div style="width: 100%">
      <div class="card person-list-item mb-1" v-if="person && view === 'item'">
	      <img v-if="person?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${person?.foto}`" class="photo-list" :alt="person.titleeng"/>
	      <img v-else :src="'/fotos/'+ person.gender + '-user-icon.png'" :alt="person.titleeng" class="photo-list photo-default" />
	      <div class="person-list-detail">
            <div class="flex">
              <div class="col-9 px-0 align-content-start">
	              <div class="person-name">{{person.titleeng}}</div>
              </div>
              <div class="col-3 px-0 flex justify-content-end">
	              <div class="person-country"><country-flag :country="person.country" size='normal' v-if="person.country"/></div>
              </div>
            </div>
	          <div class="person-name-rus">{{person.titlerus}}</div>
	          <div class="person-description">{{person.description}}</div>
            <div class="flex">
              <div class="col-6">
                <bg-likes :reputation-object-id="person._id" :isLikingLocked="isLikingLocked"></bg-likes>
              </div>
              <div class="col-6 flex justify-content-end">
                <Rating v-model="person.rating" :readonly="true" :cancel="false"></Rating>
              </div>
            </div>
	          <i class="pi pi-tag person-category-icon"></i><span class="person-category" v-if="person?.tag">{{getTagNames(person.tag)}}</span>
	      </div>
      </div>
		  <div class="person-grid-item card"  v-if="person && view !== 'item'">
		  	<div class="person-grid-item-top">
		  		<div>
		  			<i class="pi pi-tag person-category-icon"></i>
		  			<span class="person-category">{{getTagNames(person?.tag)}}</span>
		  		</div>
		  		<span class="person-badge">{{person?.dob}}</span>
		  	</div>
		  	<div class="person-grid-item-content">
		  		<img v-if="person?.foto" :src="`${WEB_STATIC_FILES}/fotos/sanctions/persons/${person?.foto}`" class="photo-grid" :alt="person?.titleeng"/>
		  		<img v-else :src="'/fotos/'+ person?.gender + '-user-icon.png'" :alt="person?.titleeng" class="photo-grid photo-default" />
		  		<div class="person-name">{{person?.titleeng}}</div>
		  		<div class="person-name-rus">{{person?.titlerus}}</div>
		  		<div class="person-description">{{person?.description}}</div>
		  		<Rating v-model="person.rating" :readonly="true" :cancel="false"></Rating>
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

export default {
	components: { Rating, 'bg-likes': Likes, CountryFlag },
	setup({ tags }){
    const tagHelper = ref(null)
    const tagsStore = useTagsStore();

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
      return { getTagNames, WEB_STATIC_FILES }
    },
    props: {
      person: {
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

<style lang="scss" scoped>

.card {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: normal;
}

	.person-grid-item-top,
	.person-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 5em;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.person-grid-item-content {
		text-align: center;
	}

	.person-gender {
		font-size: 1.5rem;
		font-weight: 600;
	}

::v-deep(.person-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.person-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.person-gender {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.person-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.person-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);


	.person-grid-item-top,
	.person-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 5em;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.person-grid-item-content {
		text-align: center;
	}

	.person-gender {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.person-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.person-list-detail {
			text-align: center;
		}

		.person-gender {
			align-self: center;
		}

		.person-list-action {
			display: flex;
			flex-direction: column;
		}

		.person-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}

</style>
