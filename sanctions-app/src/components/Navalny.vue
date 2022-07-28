<template>
  <div class="time-container">
    <div class="grid-nogutter surface-section text-800">
       <div class="col-12 md:col-8 px-2 text-center md:text-left flex align-items-center responsive-text">
           <section>
               <span class="block text-4xl font-bold mb-1">Alexey Navalny</span>
               <div class="text-4xl text-primary font-bold mb-3">the most prominent Putin's foe is illegally retained</div>
           </section>
       </div> 
       <div class="col-12 md:col-4 px-2 text-center align-items-center responsive-text justify-content-center" style="width:100%">
           <section class="section-clock">
            <div class="clock-container">
              <div class="clock-col">
                <p class="clock-day clock-timer">
                  {{past?.days}}
                </p>
                <p class="clock-label">
                  Day
                </p>
              </div>
              <div class="clock-col">
                <p class="clock-hours clock-timer">
                  {{past?.hrs}}
                </p>
                <p class="clock-label">
                  Hours
                </p>
              </div>
              <div class="clock-col">
                <p class="clock-minutes clock-timer">
                  {{past?.mins}}
                </p>
                <p class="clock-label">
                  Minutes
                </p>
              </div>
              <div class="clock-col">
                <p class="clock-seconds clock-timer">
                  {{past?.secs}}
                </p>
                <p class="clock-label">
                  Seconds
                </p>
              </div>
            </div>      
           </section>
       </div>     
      </div>
    </div>
</template>

<script>
  export default {
    name: "Navalny",
    props: {
      past: {
        default: null
      }
    },    
  }
</script>

<style scoped lang="scss">

.clock-timer{
  font-size: 4.2em;
  color: white;
}

@media (max-width: 600px) {
 .clock-timer{
  font-size: 1.6em;
} 
}

.clock-label{
  font-size: 3em;
}

.time-container{
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: calc(100vh - 60px);
  position: absolute;
  width:100%;
}

  .past {
    color: white;
    font-size: 3em;
  }
.clock-day:before {
  content: var(--timer-day);
}
.clock-hours:before {
  content: var(--timer-hours);
}
.clock-minutes:before {
  content: var(--timer-minutes);
}
.clock-seconds:before {
  content: var(--timer-seconds);
}

body {
  background: linear-gradient(45deg, #1870ed 0, #f18f88 100%);
  font-family: "Montserrat", "sans-serif";
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock-container {
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #080808;
  border-radius: 5px;
  padding: 40px 15px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.15), 0 15px 90px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
}
.clock-col {
  text-align: center;
  margin-right: 40px;
  margin-left: 40px;
  min-width: 90px;
  position: relative;
}
.clock-col:not(:last-child):before, .clock-col:not(:last-child):after {
  content: "";
  background-color: rgba(255, 255, 255, 0.3);
  height: 5px;
  width: 5px;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: -42px;
}
.clock-col:not(:last-child):before {
  top: 35%;
}
.clock-col:not(:last-child):after {
  top: 50%;
}
.clock-timer:before {
  color: #fff;
  font-size: 4.2rem;
  text-transform: uppercase;
}


.clock-label {
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  font-size: 0.7rem;
  margin-top: 10px;
}

@media (max-width: 825px) {
  .clock-container {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .clock-col{
    margin-right: 10px;
    margin-left: 10px;
    min-width: 30px;
  }

.section-clock{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.clock-timer:before {
  color: #fff;
  font-size: 3.2rem;  
}

  .clock-col + .clock-col {
    margin-top: 20px;
  }
  .clock-col:before, .clock-col:after {
    display: none !important;
  }
}
</style>
