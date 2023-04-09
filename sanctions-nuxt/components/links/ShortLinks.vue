<template>
  <div class="flex flex-wrap align-content-center h-2rem">
    <div class="flex flex-wrap align-content-center h-2rem">Links:</div>
    <div class="flex overflow-x-auto flow-row h-auto" v-if="links && links.length > 0">
      <div v-for="link in links" class="mx-2 flex flex-wrap align-content-center">
        <a class="p-button p-button-outlined h-2rem border-round-2xl" :href="link.url" target="_blank">
          <wikipedia class="flex flex-wrap align-content-center" v-if="link.type==='wk'"/>
          <youtube class="flex flex-wrap align-content-center" v-if="link.type==='yt'"/>
          <facebook class="flex flex-wrap align-content-center" v-if="link.type==='fb'"/>
          <instagram class="flex flex-wrap align-content-center" v-if="link.type==='in'"/>
          <twitter class="flex flex-wrap align-content-center" v-if="link.type==='tw'"/>
          <web class="flex flex-wrap align-content-center" v-if="['wk','yt','fb','in','tw'].indexOf(link.type) < 0"/>
          <span v-if="link.type==='wk'">Wikipedia</span>
          <span v-if="link.type==='yt'">Youtube</span>
          <span v-if="link.type==='fb'">Facebook</span>
          <span v-if="link.type==='in'">Instagram</span>
          <span v-if="link.type==='tw'">Twitter</span>
          <span v-if="['wk','yt','fb','in','tw'].indexOf(link.type) < 0">Web</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Wikipedia from 'vue-material-design-icons/Wikipedia.vue';
  import Youtube from 'vue-material-design-icons/Youtube.vue';
  import Facebook from 'vue-material-design-icons/Facebook.vue';
  import Instagram from 'vue-material-design-icons/Instagram.vue';
  import Web from 'vue-material-design-icons/Web.vue';
  import Twitter from 'vue-material-design-icons/Twitter.vue';
  import Chip from 'primevue/chip';
  import Button from 'primevue/button';

  export default {
    props: {
      links: {
      type: [],
      default: () => [],
    }
    },
    components: {
      Wikipedia, Youtube, Facebook, Instagram, Web, Chip, Button, Twitter
    },
    setup() {
      const redirect = (url) => {
        window.location.href = url;
      }
      return { redirect }
    }
  }
</script>
