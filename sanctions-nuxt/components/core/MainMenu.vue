<template>
  <div class="menu-bar">
    <div class="w-full h-1rem text-center bg-blue-300 flex justify-content-center align-items-center text-200">
      <nuxt-link no-prefetch to="/upgrade">
        Get more. Upgrage your plan
      </nuxt-link>
    </div>
		<menu-bar :model="items">
			<template #start>
        <div class="flex flex-wrap align-items-center">
          <nuxt-link no-prefetch to="/">
            <img alt="logo" src="/fotos/logo.png" height="40" class="mr-1">
          </nuxt-link>
        </div>
			</template>
			<template #end>
        <div class="menu-end-container">
          <bg-user-menu/>
		      <bg-search-input/>
        </div>
			</template>
		</menu-bar>
	</div>
</template>

<script>
import Menubar from 'primevue/menubar'
import { onMounted, ref, computed } from 'vue'
import { useContext } from '@nuxtjs/composition-api'
import SearchInput from '@/components/core/SearchInput.vue'
import UserMenu from '@/components/core/UserMenu.vue';
import Button from 'primevue/button/Button';

export default {
    setup() {
        const items = ref([])

        const { $getMenu, $auth } = useContext();
        const isLogged = computed(() => $auth.loggedIn )

        onMounted(() => {
            $getMenu().then(data => {
            items.value = data;
            });
        })

        return {
            items, isLogged
        }
    },
    components: {
        "menu-bar": Menubar,
        "bg-search-input": SearchInput,
        "bg-user-menu": UserMenu,
        Button
    }
}
</script>

<style scoped>

.p-menubar{
  border: none !important;
  border-radius: 0 !important;
  background-color: var(--surface-0);
}

.menu-bar{
  position: sticky;
  z-index: 1000;
  top: 0;
}

.title-container{
  display:flex;
  align-items: center;
  font-weight: 700;
  padding-right: 1em;
  padding-left: 1em;
}

.menu-end-container {
  display: flex;
}

</style>
