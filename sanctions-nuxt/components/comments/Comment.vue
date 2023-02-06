<template>
  <div class="w-full p-1">
    <div class="comment-item p-1 " :class="cssClass" v-if="comment && view === 'item'">
      <div class="flex justify-content-between flex-wrap card-container">
        <div class="flex align-items-center justify-content-center">
          <div class="comment-basic-info flex"><span class="font-semibold">{{ comment?.author?.username }}</span>&nbsp;<span class="">{{formatDate(comment?.createdAt)}}</span></div>
        </div>
        <div class="flex align-items-center justify-content-center" v-if="isLogged">
          <Button icon="pi pi-thumbs-up" class="p-button-text py-0" />
          <Button icon="pi pi-thumbs-down" class="p-button-text py-0" />
        </div>
      </div>
      <div class="flex justify-content-start flex-wrap card-container py-2">
        {{comment?.comment}}
      </div>
    </div>
		<div class="person-grid-item p-3"  v-if="comment && view !== 'item'">
			<div class="comment-basic-info my-2">{{formatDate(comment?.createdAt)}}</div>
			{{comment?.comment}}
		</div>
  </div>
</template>

<script>

import { formatDate } from '~/models/date.helper'
import { toRefs, computed } from 'vue'
import { useContext } from '@nuxtjs/composition-api'
import Button from 'primevue/button'

export default {

	setup(props){
    const { $auth } = useContext()
   	const isLogged = computed(() => $auth.loggedIn )
    const { comment, cssClass } = toRefs(props)
    return { comment, cssClass, formatDate, isLogged }
  },
  props: {
    	comment: {
    	  type: Object,
    	  default: () =>  {},
    	},
    	view: {
    	  type: String,
    	  default: () => 'item',
    	},
    	cssClass: {
    	  type: String,
    	  default: () => '',
    	}
  },
  components: { Button }
}
</script>

<style lang="scss" scoped>
.comment-item {
	display: flex;
	flex-direction: column;
}
.comment-basic-info{
	font-size: 0.8rem;
	color: rgba(0, 0, 0, 0.70);
}

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


</style>
