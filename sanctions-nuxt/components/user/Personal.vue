<template>
    <div class="flex-column">
      <h2>Personal</h2>
      <Divider align="left"><h4>Age & Education</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My birthday</div>
          <div>
            <Calendar v-model="birthday" :inline="false" :showButtonBar="true" :showIcon="true" :showTime="false" :timeOnly="false" class="w-auto align-items-center">
            </Calendar>
          </div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My education</div>
          <div><bg-education-selector class="w-7rem align-items-center" v-model="profile.education"></bg-education-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Family</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Marital status</div>
          <div><bg-marital-status-selector v-model="profile.marital"></bg-marital-status-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Children</div>
          <div class="w-full p-2"><bg-children-selector v-model="profile.children"></bg-children-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Work</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Position</div>
          <div><bg-work-position-selector v-model="profile.workposition"></bg-work-position-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Work status</div>
          <div class="w-full p-2"><bg-work-status-selector v-model="profile.work"></bg-work-status-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Area & Income</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Polulation of my area</div>
          <div><bg-place-selector v-model="profile.place"></bg-place-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">I belong to</div>
          <div><bg-income-selector v-model="profile.income"></bg-income-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Race & Info</h4></Divider>
      <div class="w-full py-1">Race</div>
      <bg-race-selector v-model="profile.race" class="p-2"></bg-race-selector>
      <div class="w-full py-1">I discribe myself as</div>
      <Textarea v-model="profile.info" :autoResize="true" rows="5" cols="30" class="border-blue-500 w-full"/>
      <Divider align="left"><h4>Country & Location</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My citizenship</div>
          <div><bg-country-selector class="w-12rem h-3rem align-items-center" v-model="profile.citizenship"></bg-country-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">My current location</div>
          <div><bg-country-selector class="w-12rem h-3rem align-items-center" v-model="profile.location"></bg-country-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Sex & Orientation</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Sex</div>
          <div class="w-full p-2"><bg-sex-selector v-model="profile.gender"></bg-sex-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Orientation</div>
          <div class="w-full p-2"><bg-sex-orientation-selector v-model="profile.orientation"></bg-sex-orientation-selector></div>
        </div>
      </div>
      <Divider align="left"><h4>Interests</h4></Divider>
      <bg-interests-selector v-model="profile.interests"></bg-interests-selector>
      <Divider align="left"><h4>Religion & Politics</h4></Divider>
      <div class="flex">
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Religion</div>
          <div class="w-full p-2"><bg-religion-selector v-model="profile.religion"></bg-religion-selector></div>
        </div>
        <div class="col-6 flex flex-wrap">
          <div class="w-full py-1">Political preferences</div>
          <div class="w-full py-2"><bg-political-orientation-selector v-model="profile.politicalstand"></bg-political-orientation-selector></div>
        </div>
      </div>
      <Divider></Divider>
      <div class="flex justify-content-end flex-wrap py-2">
        <Button label="Save" class="p-button-info" @click="update()"/>
      </div>
    </div>
</template>

<script>
  import Button from 'primevue/button'
  import { useProfileStore } from '@/store/profiles'
  import { computed, onMounted, watch, ref } from 'vue';
  import { useContext } from '@nuxtjs/composition-api'
  import Textarea from 'primevue/textarea'
  import Divider from 'primevue/divider';
  import CountrySelector from '../core/CountrySelector.vue';
  import SexSelector from '../core/SexSelector.vue';
  import SexOrientationSelector from '../core/SexOrientationSelector.vue';
  import ReligionSelector from '../core/ReligionSelector.vue';
  import InterestsSelector from '../core/InterestsSelector.vue';
  import PoliticalOrientationSelector from '../core/PoliticalOrientationSelector.vue';
  import EducationSelector from '../core/EducationSelector.vue';
  import PlaceSelector from '../core/PlaceSelector.vue';
  import IncomeSelector from '../core/IncomeSelector.vue';
  import Calendar from 'primevue/calendar';
  import MaritalStatusSelector from '../core/MaritalStatusSelector.vue';
  import WorkStatusSelector from '../core/WorkStatusSelector.vue';
  import ChildrenSelector from '../core/ChildrenSelector.vue';
  import WorkPositionSelector from '../core/WorkPositionSelector.vue';
  import RaceSelector from '../core/RaceSelector.vue';

  export default {
    setup() {
      const profileStore = useProfileStore()
      const { $toast } = useContext()
      const birthday = ref(null)

      const profile = computed(() => {
        if (profileStore?.Profile && !birthday.value) {
          birthday.value = profileStore?.Profile.birthday && (new Date(profileStore?.Profile.birthday))?.toLocaleDateString()
        }
			  return profileStore?.Profile;
		  })



      let ctx = null;
      onMounted(() => {
        ctx = useContext()
        console.log(profile.birthday)
        birthday.value = profile?.birthday && (new Date(profile?.birthday))?.toLocaleDateString()
      });

      const update = async () => {
        const {
          info,
          userId,
          nickname,
          education,
          marital,
          children,
          workposition,
          work,
          place,
          income,
          race,
          citizenship,
          location,
          gender,
          orientation,
          religion,
          politicalstand,
          interests
        } = profile.value

        await profileStore.updateProfile({
          info,
          userId,
          birthday: birthday.value,
          nickname,
          education,
          marital,
          children,
          workposition,
          work,
          place,
          income,
          race,
          citizenship,
          location,
          gender,
          orientation,
          religion,
          politicalstand,
          interests
        }, ctx)

        $toast.success('Your profile is updated')
      }

      watch(profile, (newValue, oldValue) => {
        birthday.value = newValue?.birthday && (new Date(newValue?.birthday))?.toLocaleDateString()
      })

      return { profile, profileStore, update, birthday }
    },
    components: { Button, Textarea, Divider, Calendar,
      'bg-country-selector': CountrySelector,
      'bg-sex-selector': SexSelector,
      'bg-sex-orientation-selector': SexOrientationSelector,
      'bg-interests-selector': InterestsSelector,
      'bg-religion-selector': ReligionSelector,
      'bg-political-orientation-selector': PoliticalOrientationSelector,
      'bg-education-selector': EducationSelector,
      'bg-place-selector': PlaceSelector,
      'bg-income-selector': IncomeSelector,
      'bg-marital-status-selector': MaritalStatusSelector,
      'bg-work-status-selector': WorkStatusSelector,
      'bg-children-selector': ChildrenSelector,
      'bg-work-position-selector': WorkPositionSelector,
      'bg-race-selector': RaceSelector
    },
  }
</script>

