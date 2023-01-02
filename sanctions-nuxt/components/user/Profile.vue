<template>
  <div class="h-full">
    <div v-if="!profile?.login" class="p-0 h-screen flex align-content-center flex-wrap card-container">
      <bg-create-profile :store="store"/>
    </div>
    <div v-if="profile?.login">
      <TabMenu :model="items" :activeIndex.sync="active"/>
      <div class="p-grid h-full py-3">
        <div class="col-6 col-offset-3 surface-0 p-5 card_shadow">
          <bg-personal v-if="active === 1"></bg-personal>
          <bg-setting v-if="active === 2"></bg-setting>
          <bg-security v-if="active === 3"></bg-security>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabMenu from 'primevue/tabmenu';
import Personal from '~/components/user/Personal.vue';
import Settings from '@/components/user/Settings.vue';
import Security from '@/components/user/Security.vue';
import CreateProfile from '@/components/user/CreateProfile.vue'
import { useProfileStore } from '@/store/profiles';
import { ref, onMounted, computed } from 'vue';


export default {
  setup() {
		const profilesStore = useProfileStore();

		onMounted(() => {
			if (!profilesStore?._id) {
				profilesStore.fetchPrivateProfile();
			}
		});

		const profile = computed(() => {      
			return profilesStore?.Profile;
		});
    
    const active = ref(1)

    const items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
      {label: 'Personal', icon: 'pi pi-fw pi-user'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'},
      {label: 'Security', icon: 'pi pi-fw pi-shield'}
    ]
    return { items, active, profile, 'store': profilesStore }
  },
  components: { TabMenu, 
    'bg-personal': Personal, 
    'bg-setting': Settings, 
    'bg-security': Security,
    'bg-create-profile': CreateProfile 
  }
}
</script>
