<template>
  <div class="h-full w-full">
    <div v-if="!profile?.userId" class="p-0 h-screen flex align-content-center flex-wrap card-container justify-content-center">
      <bg-create-profile :store="store"/>
    </div>
    <div v-if="profile?.userId" class="h-full">
      <TabMenu :model="items" :activeIndex.sync="active" class="fixed w-full z-5"/>
      <div class="p-grid h-full py-7">
        <div class="md:col-6 col-12 md:col-offset-3 surface-0 p-5 shadow-1">
          <bg-personal v-if="active === 1"></bg-personal>
          <bg-setting v-if="active === 2"></bg-setting>
          <bg-security v-if="active === 3"></bg-security>
          <bg-association v-if="active === 4"></bg-association>
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
import Association from '@/components/user/Association.vue';
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
      {label: 'Security', icon: 'pi pi-fw pi-shield'},
      {label: 'Association', icon: 'pi pi-fw pi-box'}
    ]
    return { items, active, profile, 'store': profilesStore }
  },
  components: { TabMenu,
    'bg-personal': Personal,
    'bg-setting': Settings,
    'bg-security': Security,
    'bg-association': Association,
    'bg-create-profile': CreateProfile
  }
}
</script>
