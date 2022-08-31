<template>
    <bg-navalny :past="past"/>
</template>

<script>
  import Navalny from "@/components/Navalny.vue";
  import { ref, onMounted, onUnmounted } from 'vue'

  export default {
    setup() {

      const initialDate = new Date(2021, 0, 17, 19, 0);
      const past = ref('');
      let timer = null;
      const interval = 1000;

      const msToTime = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        s = (s - mins) / 60;
        var hrs = s % 24;
        var days = (s - hrs ) / 24;    
        return {days, hrs: hrs?.toString().padStart(2, '0'), mins: mins?.toString().padStart(2, '0'), secs: secs?.toString().padStart(2, '0')};
      }
      
      const updateTimerValue = () => {
        past.value = msToTime(Date.now() - initialDate);
      }
      
      const runTimer = () => {
        if (!timer) {
          timer = setInterval(() => updateTimerValue(), interval);
        }
      }

      const destroyTimer = () => {
        if (timer) {
            clearInterval(timer);
        }      
      }

      onMounted(runTimer) 
      onUnmounted(destroyTimer)

      return {
        past
      }
    },    
    components: { 
      'bg-navalny': Navalny 
    },
  }
</script>
 