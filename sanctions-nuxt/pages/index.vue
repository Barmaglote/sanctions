<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 px-6 text-center md:text-left flex align-items-center responsive-text">
        <section>
            <span class="block text-5xl font-bold mb-1">Stop the war in Ukraine!</span>
            <div class="text-5xl text-primary font-bold mb-3">Russian opposition stands together with Ukraine</div>
            <p class="mt-0 mb-4 text-1xl text-700 line-height-3">We support initiative of <a href="https://acf.international/" target="_blank">ACF.International</a> to put sanctions against Putin's regime. Please take a look on proposed sanction list</p>
            
            <p-button label="People" type="button" class="mr-3 p-button-raised" @click="$router.push('/sanctions/persons/list')"></p-button>
            <p-button label="Organizations" type="button" class="p-button-outlined" @click="$router.push('/sanctions/organizations/list')"></p-button>
        </section>
    </div>
    <div class="col-12 md:col-6 px-8 text-center md:text-center flex align-items-center justify-content-center photo-container">
        <section>
          <div class="striped">
            <img class="framed" src="/images/pexels-photo-11291271.jpeg" alt="random image">
          </div>            
        </section>
    </div>    
</div>
</template>

<script lang="ts">
import Button from 'primevue/button';

export default{
  name: 'index',
  components: {
    'p-button': Button
  },
}
</script>


<style scoped lang="scss">
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