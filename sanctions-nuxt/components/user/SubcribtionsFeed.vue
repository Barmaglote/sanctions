<template>
  <div style="width: 100%">
    <div class="flex flex-wrap p-3" v-if="!loading">
      <div v-for="subscribtion, i in items" :id="i" class="my-1 flex flex-wrap py-1 w-full">
        <bg-subscribtion :subscribtion="subscribtion"></bg-subscribtion>
      </div>
    </div>
    <div class="flex flex-wrap p-3" v-if="loading">
      <Skeleton shape="circle"/>
    </div>
  </div>
</template>

<script>
  import { onMounted, useContext } from '@nuxtjs/composition-api'
  import { ref } from 'vue'
  import Subscribtion from '@/components/subscribes/Subscribtion.vue'
  import Button from 'primevue/button'
  import ProgressSpinner from 'primevue/progressspinner';
  import Skeleton from 'primevue/skeleton';

  export default {
    components: {
      'bg-subscribtion': Subscribtion, Button, ProgressSpinner, Skeleton
    },
    setup({ userId }) {
      const { $getSubscribtions } = useContext()
      const loading = ref(false)
      const items = ref([])
      const isMoreAvailable = ref(true)

      const fetchSubscribtions = () => {
        if (loading.value === true || isMoreAvailable.value === false) return;
        loading.value = true;

        $getSubscribtions(userId).then((result) => {
          if (!result?.data?.getSubscribtions || result?.data?.getSubscribtions.length < 10) {
            isMoreAvailable.value = false;
          }

          if (result?.data?.getSubscribtions === null || result?.data?.getSubscribtions.length === 0) { return }

          items.value = [...items.value, ...JSON.parse(JSON.stringify(result.data.getSubscribtions))]

          console.log(items);

        }).catch(e => {
          console.log(e)
        }).finally(x => {
          loading.value = false;
        })
      }

      onMounted(() => {
        fetchSubscribtions()
      })

      return { loading, fetchSubscribtions, items, isMoreAvailable }
    },
    props: {
      userId: {
        type: String,
        default: () => null,
      },
    }
  }
</script>
