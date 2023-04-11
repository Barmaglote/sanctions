<template>
  <div class="grid grid-nogutter">
    <bg-finance></bg-finance>
  </div>
</template>

<script lang="ts">
import Finance from '@/components/user/Finance.vue';

export default{
  name: 'upgrade',
  components: {
    'bg-finance': Finance
  },
}
</script>
