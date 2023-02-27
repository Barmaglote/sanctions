<template>
  <div style="width: 100%">
    <div class="flex flex-wrap p-3">
      <div v-for="commentOfUser, i in comments" :id="i" class="my-1 flex flex-wrap py-1 w-full">
        <bg-comment :comment="commentOfUser" view="item" :reputation-object-id="userId"></bg-comment>
        <!--
        <div v-if="commentOfUser.comments?.length > 0" class="ml-5 p-2">
          <div v-for="comment in commentOfUser.comments">
          	<bg-comment :comment="comment" view="item" class="border-left-2 border-yellow-500 m-2" :reputation-object-id="reputationObjectId"></bg-comment>
          </div>
        </div>
        <div v-if="currentParentCommentID !== slotProps.data.id && isLogged" class="p-2 flex">
          <Button label="Add a comment" class="p-button-text" icon="pi pi-plus" @click="currentParentCommentID = slotProps.data.id"/>
        </div>
        -->
      </div>
      <div class="w-full h-4rem flex justify-content-center" v-if="isMoreAvailable" >
        <Button @click="fetchComments" label="More" class="p-button-text w-full" v-if="!loading"></Button>
        <ProgressSpinner style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
  import { onMounted, useContext } from '@nuxtjs/composition-api'
  import { ref } from 'vue'
  import Comment from '@/components/comments/Comment.vue'
  import Button from 'primevue/button'
  import ProgressSpinner from 'primevue/progressspinner';

  export default {
    components: {
      'bg-comment': Comment, Button, ProgressSpinner
    },
    setup({ userId }) {
      const { $getComments } = useContext()
      const loading = ref(false)
      const page = ref(0)
      const comments = ref([])
      const isMoreAvailable = ref(true)

      const lastLazyLoadEvent = ref({
        sortField: null,
        sortOrder: null,
        first: 0,
        rows: 10,
        filters: null
      })

      const fetchComments = () => {
        if (loading.value === true || isMoreAvailable.value === false) return;
        loading.value = true;
        console.log(lastLazyLoadEvent);
        $getComments(userId, lastLazyLoadEvent.value).then((result) => {

          console.log(result);

          if (!result?.data?.comments || result?.data?.comments.length < 10) {
            isMoreAvailable.value = false;
          }

          if (result?.data?.comments === null || result?.data?.comments.length === 0) { return }

          comments.value = [...comments.value, ...JSON.parse(JSON.stringify(result.data.comments))]
        }).catch(e => {
          console.log(e)
        }).finally(x => {
          loading.value = false;
        })
      }

      onMounted(() => {
        fetchComments()
      })

      return { loading, fetchComments, comments, isMoreAvailable }
    },
    props: {
      userId: {
        type: String,
        default: () => null,
      },
    }
  }
</script>
