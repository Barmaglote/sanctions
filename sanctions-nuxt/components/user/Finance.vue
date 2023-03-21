<template>
    <div class="flex-column">
      <h2>Finance</h2>
      <Divider align="left"><h4>Account</h4></Divider>
      <div class="p-5">
        <div class="w-full grid text-xl">
          <div class="col-6 text-left">
            Ballance
          </div>
          <div class="col-6 text-right">
            100$
          </div>
          <div class="col-6 text-left">
            Daily spend
          </div>
          <div class="col-6 text-right">
            1$/day
          </div>
        </div>
      </div>
      <Divider align="left"><h4>Tarif</h4></Divider>
        <div class="flex flex-wrap">
          <div class="flex w-full text-xl py-2" @click="tarif = 'bsc'">
            <RadioButton inputId="tarif1" name="tarif" value="bsc" v-model="tarif"/>
            <label for="tarif1" class="m-0 px-2 cursor-pointer"><span class="font-bold">Basic</span>. Standard functionality. Forever. 1000 comments and likes per month.</label>
          </div>
          <div class="flex w-full text-xl py-2" @click="tarif = 'per-start'">
            <RadioButton inputId="tarif2" name="tarif" value="per-start" v-model="tarif" />
            <label for="tarif2" class="m-0 px-2 cursor-pointer"><span class="font-bold">Personal start</span>. Posts. Meetings. Debates. Simple polls. Total amount 100 items per month. Standard reports. 10k comments & liker per month.</label>
          </div>
          <div class="flex w-full text-xl py-2" @click="tarif = 'per-profi'">
            <RadioButton inputId="tarif3" name="tarif" value="per-profi" v-model="tarif" />
            <label for="tarif3" class="m-0 px-2 cursor-pointer"><span class="font-bold">Personal profi</span>. Posts. Meetings. Debates. Surveys. Total amount 10000 items per month. Advanced reports. Personal assistents</label>
          </div>
          <div class="flex w-full text-xl py-2" @click="tarif = 'org-start'">
            <RadioButton inputId="tarif4" name="tarif" value="org-start" v-model="tarif" />
            <label for="tarif4" class="m-0 px-2 cursor-pointer"><span class="font-bold">Organization start</span>. Organitation & Personal profile. Debates. Simple polls. Total amount 100 items per month. Standard reports. 10k comments & liker per month.</label>
          </div>
          <div class="flex w-full text-xl py-2"  @click="tarif = 'org-profi'">
            <RadioButton inputId="tarif5" name="tarif" value="org-profi" v-model="tarif" />
            <label for="tarif4" class="m-0 px-2 cursor-pointer"><span class="font-bold">Organization start</span>. Organitation & Personal profile. Posts. Meetings. Debates. Surveys. Total amount 10000 items per month. Advanced reports. Personal assistents</label>
          </div>

        </div>
    </div>
</template>

<script>
  import Divider from 'primevue/divider/Divider';
  import RadioButton from 'primevue/radiobutton';

  export default {
    data() {
		  return {
			  tarif: 'std'
		  }
	  },
    components: {
      Divider, RadioButton
    }
  }
</script>

