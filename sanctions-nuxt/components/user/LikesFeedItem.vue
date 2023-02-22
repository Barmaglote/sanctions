<template>
  <div style="width: 100%">
    <div v-if="like.reputationObjectType === 'per'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Person <nuxt-link class="font-semibold underline" :to="{ path: `/reputation/person/${like?.reputationObject?._id}` }">{{ like.reputationObject.titleeng }}</nuxt-link>
    </div>
    <div v-if="like.reputationObjectType === 'com'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Comment by
      <Panel header="Header">
        {{ like.reputationObject.comment }}
      </Panel>
    </div>
    <div v-if="like.reputationObjectType === 'org'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Organization {{ like.reputationObject.titleEng }}
    </div>
  </div>
</template>

<script>
  import Panel from 'primevue/panel';
  export default {
    components: {
      Panel
    },
    setup({ like }) {
      return { like }
    },
    props: {
      like: {
        type: Object,
        default: () => null,
      },
    }
  }
</script>
