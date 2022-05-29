<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 px-6 text-center md:text-left flex align-items-center ">
        <section>
            <span class="block text-6xl font-bold mb-1">Stop the war in Ukraine!</span>
            <div class="text-6xl text-primary font-bold mb-3">Russian opposition stands together with Ukraine</div>
            <p class="mt-0 mb-4 text-700 line-height-3">We support initiative of <a href="https://acf.international/" target="_blank">ACF.International</a> to put sanctions against Putin's regime. Please take a look on proposed sanction list</p>
            
            <Button label="People" type="button" class="mr-3 p-button-raised" @click="$router.push('/sanctions/persons/list')"></Button>
            <Button label="Organizations" type="button" class="p-button-outlined" @click="$router.push('/sanctions/organizations/list')"></Button>
        </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
        <img src="/images/pexels-markus-spiske-11622841.jpg" alt="Image" class="md:ml-auto block md:h-full mainbackground" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

// Components
import ShortInfo from '../components/ShortInfo.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    ShortInfo, Button
  },
});
</script>


<style scoped>
.surface-section{
  position: fixed;
  width: 100%;
}

.mainbackground{
  height: 100vh !important;
}
</style>