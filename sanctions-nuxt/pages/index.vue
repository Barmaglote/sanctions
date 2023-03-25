<template>
  <div class="grid grid-nogutter p-0 w-full">
    <div class="col-2 sticky border-right-1 border-none border-solid border-300 flex justify-content-end p-3 ">
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
              <Button label="Post" class="p-button w-full" @click="area = 'post'" v-if="isLogged"/>
            </div>
        </div>
    </div>
    <div class="col-10 p-3">
        <section>
          <div class="w-full grid">
            <div class="col-9 h-full">
              <template v-if="area === 'posts' ">
                <h1>Posts</h1>
                <bg-posts class="shadow-1"></bg-posts>
              </template>
              <template v-if="area === 'persons'">
                <h1>Persons</h1>
                <bg-persons class="shadow-1"></bg-persons>
              </template>
              <template v-if="area === 'organizations' ">
                <h1>Organizations</h1>
                <bg-organizations class="shadow-1"></bg-organizations>
              </template>
              <template v-if="area === 'events'">
                <h1>Events</h1>

              </template>
              <template v-if="area === 'post'">
                <h1>Post</h1>
                <bg-post class="shadow-1" @submit="area = 'posts'"></bg-post>
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
import Post from '~/components/posts/Post.vue';
import Persons from '~/components/sanctions/Persons.vue';
import Organizations from '~/components/sanctions/Organizations.vue';
import { ref, computed } from 'vue';
import { useContext } from '@nuxtjs/composition-api'

export default{
  name: 'index',
  setup(){
    const area = ref('posts');
    const { $auth } = useContext()
   	const isLogged = computed(() => $auth.loggedIn )
    return { area, isLogged }
  },
  components: {
    Button,
    Divider,
    'bg-posts': Posts,
    'bg-post': Post,
    'bg-persons': Persons,
    'bg-organizations': Organizations
},
}
</script>

