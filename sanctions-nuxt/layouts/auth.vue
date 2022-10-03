<template>
    <div class="vertical-middle">
      <main>
        <Nuxt/>        
      </main>      
    </div>
</template>

<script lang="ts">  
    export default {
		  setup() {}
    }
</script>


<style lang="scss">

#__nuxt, #__layout {
  height: 100%;
}

  /*
html, body, main {
  padding: 0;
  margin: 0;
  height: 100% !important;
}
*/

.vertical-middle {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>