<template>
  <div style="width: 100%">
    <div v-if="like.reputationObjectType === 'per'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Person {{ like.reputationObject.titleEng }}
    </div>
    <div v-if="like.reputationObjectType === 'com'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Comment by {{ like.reputationObject.author.username }}
      <div>{{ like.reputationObject.comment }}</div>
    </div>
    <div v-if="like.reputationObjectType === 'org'">
      User <b>{{like.isPositive ? 'liked' : 'disliked'}}</b> Organization {{ like.reputationObject.titleEng }}
    </div>
  </div>
</template>

<script>
  export default {
    setup({ like }) {
      return { reputationObject, like }
    },
    props: {
      userId: {
        type: Object,
        default: () => null,
      },
    }
  }
</script>
