<template>
    <div>
	    <bg-menu/>
      <main>
        <Nuxt/>        
      </main>      
      <p-scrolltop :threshold="100"></p-scrolltop>
      <p-toast/>
    </div>
</template>

<script lang="ts">
    import MainMenu from '@/components/MainMenu.vue';
    import ScrollTop from 'primevue/scrolltop';
    import Toast from 'primevue/toast';    
    export default {
		setup() {
            
        },
        components:  {
				"bg-menu": MainMenu,
				"p-scrolltop": ScrollTop,
        "p-toast": Toast
		}
    }
</script>


<style>
body {
  padding: 0;
  margin: 0;
}
</style>