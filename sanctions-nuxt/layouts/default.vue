<template>
    <div>
	    <bg-menu/>
      <main>
        <Nuxt/>        
      </main>      
      <p-scrolltop :threshold="100"></p-scrolltop>
    </div>
</template>

<script>
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


<style scoped lang="scss">
body {
  padding: 0;
  margin: 0;
}

.surface-section{
  position: fixed;
  width: 100%;
  height: 100%;
}

a{
    color: var(--primary-color) !important
}

img.framed {
  box-shadow:
    -50px -50px 0 -40px var(--primary-color),
    50px 50px 0 -40px var(--primary-color);
  width: 40em;
}

$size: 5px;
$stripeColor: #bbb;
$gray: #999;
$bgColor: #111;

.striped {
  position: relative;
 
  &::before, &::after {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
  }
  
  &::before {
    height: 75%;
    width: 50%;
    right: -10%;
    top: -20%;
    background-image: repeating-linear-gradient(
      45deg,
      $gray,
      $gray $size,
      transparent $size,
      transparent $size*2
    );
  }
  
  &::after {
    height: 120%;
    width: 70%;
    top: -10%;
    right: -20%;
    background: $stripeColor;
    z-index: -2;
  }
  
}

.mainbackground{
  height: 100vh !important;
}

@media screen and (max-width: 600px) {
  .photo-container {
    visibility: hidden;
    display: none;
  }

  .responsive-text div{
    font-size: smaller;
  }
}

</style>