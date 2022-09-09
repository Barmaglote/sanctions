<template>
    <div class="menu-bar">
		<menu-bar :model="items">
			<template #start>
                <nuxt-link no-prefetch to="/">
                    <img alt="logo" src="/fotos/logo.png" height="40" class="mr-1">
                </nuxt-link>
			</template>
			<template #end>
                <div class="menu-end-container">
                    <!--
                    <UserMenuItem></UserMenuItem>
                    -->
		            <bg-search-input/>
                </div>
			</template>
		</menu-bar>
	</div>
</template>

<script>  
import Menubar from 'primevue/menubar'
import { onMounted, ref } from 'vue'
import { useContext } from '@nuxtjs/composition-api'
import SearchInput from '@/components/SearchInput.vue'

export default {

    setup() {
        const items = ref([])

        const { $getMenu } = useContext();

        onMounted(() => {
            $getMenu().then(data => {
            items.value = data;
            });    
        })

        return {
            items
        }
    },
    components: {
        "menu-bar": Menubar,
        "bg-search-input": SearchInput
    }
}
</script>

<style scoped>

.p-menubar{
   border: none !important;
   border-radius: 0 !important;
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
