<template>
    <div class="flex-column">
      <h2>Finance</h2>
      <Divider align="left"><h4>Account</h4></Divider>
      <div class="p-4">
        <div class="w-full grid text-lg">
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
        <div class="flex flex-wrap p-4">
          <div class="flex w-full text-lg py-2" @click="tarif = 'bsc'">
            <RadioButton inputId="tarif1" name="tarif" value="bsc" v-model="tarif"/>
            <label for="tarif1" class="m-0 px-2 cursor-pointer"><span class="font-bold">Basic</span>. Standard functionality: comments and likes.</label>
          </div>
          <div class="flex w-full text-lg py-2" @click="tarif = 'per-start'">
            <RadioButton inputId="tarif2" name="tarif" value="per-start" v-model="tarif" />
            <label for="tarif2" class="m-0 px-2 cursor-pointer"><span class="font-bold">Personal Start</span>. Additional functionlality: posts, events, debates, simple polls.</label>
          </div>
          <div class="flex w-full text-lg py-2" @click="tarif = 'per-profi'">
            <RadioButton inputId="tarif3" name="tarif" value="per-profi" v-model="tarif" />
            <label for="tarif3" class="m-0 px-2 cursor-pointer"><span class="font-bold">Personal Advanced</span>. Advanced functionality: surveys, assistents, page customizazion, advanced reports.</label>
          </div>
          <div class="flex w-full text-lg py-2" @click="tarif = 'org-start'">
            <RadioButton inputId="tarif4" name="tarif" value="org-start" v-model="tarif" />
            <label for="tarif4" class="m-0 px-2 cursor-pointer"><span class="font-bold">Organization Start</span>. Additional organitational profile with starting functionality: posts, events, debates, simple polls.</label>
          </div>
          <div class="flex w-full text-lg py-2"  @click="tarif = 'org-profi'">
            <RadioButton inputId="tarif5" name="tarif" value="org-profi" v-model="tarif" />
            <label for="tarif4" class="m-0 px-2 cursor-pointer"><span class="font-bold">Organization Advanced</span>. Additional organitational profile with advanced functionality. surveys, assistents, page customizazion, advanced reports, image & video gallery.</label>
          </div>
        </div>
        <Divider></Divider>
        <div class="flex justify-content-end flex-wrap py-2">
          <Button label="Save" class="p-button-info" @click="update()"/>
        </div>
    </div>
</template>

<script>
  import Divider from 'primevue/divider/Divider';
  import RadioButton from 'primevue/radiobutton';
  import Button from 'primevue/button';
  import { ref } from 'vue';

  export default {
    setup() {
      const tarif = ref('bsc')
      const update = () => {
        console.log("update")
      }

      return { tarif, update }
    },
    components: {
      Divider, RadioButton, Button
    }
  }
</script>

