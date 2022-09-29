<template>
  <div>
    <SplitButton icon="pi pi-user" class="mx-2 bg-primary border-round" :model="items" @click="goToProfile"></SplitButton>  
  </div>
</template>

<script>
import SplitButton from 'primevue/splitbutton'
import { useRouter, ref, useContext } from '@nuxtjs/composition-api'

export default {
  components: { SplitButton },
  setup(){

    const { $auth } = useContext()
    const router = useRouter()

    const items = ref([
      {
					label: $auth.loggedIn ? $auth.user.username : 'Anonymous',
					icon: 'pi pi-user',
					command: () => {
						router.push('/auth/profile')
					}
			},
      {
					label:  $auth.loggedIn ? 'Sign out' : 'Sign in',
					icon: $auth.loggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in',
					command: () => {
            if ($auth.loggedIn) {
              // this.authStore.logout(); //TODO: !!!
            };
            router.push('/auth/login');
					}
				},
				{
					label:  'Register',
					icon: 'pi pi-user-plus',
					command: () => {
            if ($auth.loggedIn) {
              // this.authStore.logout(); //TODO: 
            };
            router.push('/auth/register');
					}
				}         
    ])

    if ($auth.loggedIn) { 
      items.value.push(
			{
				label:  'Change password',
				icon: 'pi pi-user-edit',
				command: () => {
          router.push('/auth/changepassword');
				}
			});    
    }

    const goToProfile = () => {
      router.push('/auth/profile')
    }    

    return { router, items, goToProfile }
  }
}
</script>


