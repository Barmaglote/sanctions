<template>
    <div style="width: 100%">
      <div class="card p-5 flex flex-wrap shadow-1">
        <div class="text-4xl font-bold w-full">
          @{{ profile?.nickname }}
        </div>
        <div class="text-2xl font-medium w-full mt-5">
          {{ profile?.info }}
        </div>
      </div>
  </div>
</template>

<script>
  import { onMounted, useContext } from '@nuxtjs/composition-api'
  import { ref } from 'vue'

  export default {
    setup({ userId }) {
      const { $fetchPublicProfile } = useContext()
      const loading = ref(false)
      const profile = ref(null)


      const fetchProfile = () => {
        $fetchPublicProfile(userId).then((result) => {
          profile.value = result?.data?.profile;
        })
      }

      onMounted(() => {
        fetchProfile()
      })

      return { loading, profile }
    },
    props: {
      userId: {
        type: String,
        default: () => null,
      },
    }
  }
</script>
