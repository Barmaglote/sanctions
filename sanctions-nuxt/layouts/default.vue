<template>
    <div>
	    <bg-menu/>
      <main>
        <Nuxt/>        
      </main>      
      <p-scrolltop :threshold="100"></p-scrolltop>
    </div>
</template>

<script lang="ts">
    import MainMenu from '@/components/core/MainMenu.vue';
    import ScrollTop from 'primevue/scrolltop';
   
  
    export default {
		setup() {

    },
    components:  {
			"bg-menu": MainMenu,
			"p-scrolltop": ScrollTop
		}
    }
</script>


<style>
body {
  padding: 0;
  margin: 0;
}
</style>