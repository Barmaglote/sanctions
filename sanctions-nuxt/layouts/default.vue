<template>
    <div class="">
	    <bg-menu class="shadow-1"/>
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
  background-color: #ffffff;
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
  background-color: #FFFFFF;
  //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23E8FFFF'/%3E%3Cstop offset='1' stop-color='%23F3FFDF'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(1,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23FFE1DE'/%3E%3Cstop offset='1' stop-color='%23FFFDF3'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='11.219999999999999'%3E%3Cpath transform='translate(-32.2 -4.4) rotate(-5.9 1409 581) scale(0.94637)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='3.74' transform='translate(-62.5 31) rotate(-1.2000000000000002 800 450) scale(0.9949499999999999)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(-5.699999999999999 1.5) rotate(-22.5 401 736) scale(0.9949499999999999)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='3.4'%3E%3Cpath transform='translate(186 8.6) rotate(-2.15 150 345) scale(1.0107899999999999)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='7.48' transform='translate(-8.5 -88) rotate(-39.599999999999994 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-68.4 11.6) rotate(-6.6 1400 132) scale(0.895)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
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
