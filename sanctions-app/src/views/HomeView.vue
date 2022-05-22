<template>
  <short-info msg="Test"></short-info>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import ShortInfo from '../components/ShortInfo.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    ShortInfo,
  },
});
</script>
