<template>
  <div class="grid grid-nogutter p-0 bg-white">
    <div class="col-2 sticky border-right-1 border-none border-solid border-300 flex justify-content-end p-3">
        <div class="fixed w-10rem">
          <Button label="Home" class="p-button-link" icon="pi pi-home"/>
          <Divider></Divider>
          <div class="w-full flex flex-wrap">
            <Button label="Posts" class="p-button-link w-full text-left" @click="area = 'posts'"/>
            <Button label="Persons" class="p-button-link w-full text-left" @click="area = 'persons'"/>
            <Button label="Organizations" class="p-button-link w-full text-left" @click="area = 'organizations'"/>
            <Button label="Events" class="p-button-link w-full text-left" @click="area = 'events'"/>
            <Button label="Tags" class="p-button-link w-full text-left"/>
            <Button label="Debates" class="p-button-link w-full text-left"/>
            <Button label="History" class="p-button-link w-full text-left"/>
          </div>
          <Divider></Divider>
            <div class="px-3">
              <Button label="Post" class="p-button w-full"/>
            </div>
        </div>
    </div>
    <div class="col-10 p-3">
        <section>
          <div class="w-full grid">
            <div class="col-9">
              <template v-if="area === 'posts' ">
                <h1>Posts</h1>
                <bg-posts></bg-posts>
              </template>
              <template v-if="area === 'persons' ">
                <h1>Persons</h1>
                <bg-persons></bg-persons>
              </template>
              <template v-if="area === 'organizations' ">
                <h1>Organizations</h1>
                <bg-organizations></bg-organizations>
              </template>
            </div>
            <div class="col-3">

            </div>
          </div>
        </section>
    </div>
</div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider/Divider';
import Posts from '~/components/posts/Posts.vue';
import Persons from '~/components/sanctions/Persons.vue';
import Organizations from '~/components/sanctions/Organizations.vue';
import { ref } from 'vue';

export default{
  name: 'index',
  setup(){
    const area = ref('posts');

    return { area }
  },
  components: {
    Button,
    Divider,
    'bg-posts': Posts,
    'bg-persons': Persons,
    'bg-organizations': Organizations
},
}
</script>

