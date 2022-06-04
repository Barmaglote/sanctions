<template>
    <Navalny :past="past"></Navalny>
</template>

<script>
  import Navalny from "./../components/Navalny.vue";
  export default {
    name: "NavalnyView",
    data() {
        return {
			    timer: null,
          past: '',
          interval: 1000,
          initialDate: new Date(2021, 0, 17, 19, 0)
        }
    },    
    components: { Navalny },
    created() {
      this.runTimer();
    },
    destroyed(){
      this.destroyTimer();
    },
    beforeRouteLeave(to, from, next) {
      this.destroyTimer();
      next();
    },
    methods: {
      runTimer() {
        if (!this.timer) {
          this.timer = setInterval(() => this.updateTimerValue(), this.interval);
        }
      },      
      destroyTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }      
      },
      updateTimerValue(){
        this.past = this.msToTime(Date.now() - this.initialDate);
      },
      msToTime(s) {
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
    }
  }
</script>
