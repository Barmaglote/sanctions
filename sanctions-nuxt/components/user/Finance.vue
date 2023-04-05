<template>
  <div class="flex-row flex gap-3 p-0 align-content-center flex-wrap card-container justify-content-center">
    <div class="w-full text-center py-3">
      <h1 class="text-5xl">Upgrade your plan</h1>
      <h3 class="text-1xl text-600 font-normal">Select a plan that fits your ambitions</h3>
    </div>
    <div class="w-18rem card shadow-1 h-31rem flex flex-wrap align-content-start">
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem">
        <div class="flex flex-wrap text-3xl text-800 font-bold justify-content-center align-content-center h-full">Anonymous</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-bold"><account></account></div>
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-normal">1</div>
        </div>
      </div>
      <div class="h-4rem w-full flex">
        Includes basic functionality: comments, likes, subscribtion. Best choice for anonymous readers
      </div>
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem my-4">
        <div class="flex flex-wrap text-5xl text-800 font-bold justify-content-center align-content-center h-full">$0</div>
      </div>
      <div class="w-full surface-100 h-10rem">
        <div class="font-semibold p-3">Basic set:</div>
        <ul>
          <li>Comments</li>
          <li>Likes/Dislikes</li>
          <li>Anonimity</li>
          <li>Subscribes</li>
        </ul>
      </div>
      <Button label="Current plan" class="p-button-text w-full mt-6 mb-2" />
    </div>
    <div class="w-18rem card shadow-1 h-31rem flex flex-wrap align-content-start">
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem">
        <div class="flex flex-wrap text-3xl text-800 font-bold justify-content-center align-content-center h-full">Public</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-bold"><account></account></div>
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-normal">1</div>
        </div>
      </div>
      <div class="h-4rem w-full flex">
        Includes additional functionality: post, events, polls. Basic tools for public persons.
      </div>
      <div class="w-full justify-content-start flex flex-row h-3rem my-4">
        <div class="flex flex-wrap text-5xl text-800 font-bold justify-content-center align-content-center h-full">$5</div>
        <div class="flex flex-row text-1xl text-400 ">
          <div class="h-full flex flex-wrap font-bold">/month</div>
        </div>
      </div>
      <div class="w-full surface-100 h-10rem">
        <div class="font-semibold p-3">Everything in Anonymous (except anonymity), plus:</div>
        <ul>
          <li>Posts</li>
          <li>Single polls</li>
          <li>Confirmed personality</li>
          <li>Events</li>
        </ul>
      </div>
      <Button label="Upgrade now" class="w-full mt-6 mb-2" />
      <div class="text-sm font-normal w-full text-center text-600">Billed annually for $60</div>
    </div>
    <div class="w-18rem card shadow-1 h-31rem flex flex-wrap align-content-start">
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem">
        <div class="flex flex-wrap text-3xl text-800 font-bold justify-content-center align-content-center h-full">Pro</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-bold"><account></account></div>
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-normal">1</div>
        </div>
      </div>
      <div class="h-4rem w-full flex">
        Extends the PR capabilities and includes pro tools for active public persons who want to accelerate their productivity
      </div>
      <div class="w-full justify-content-start flex flex-row h-3rem my-4">
        <div class="flex flex-wrap text-5xl text-800 font-bold justify-content-center align-content-center h-full">$9</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full flex flex-wrap font-bold">/month</div>
        </div>
      </div>
      <div class="w-full surface-100 h-10rem">
        <div class="font-semibold p-3">Everything in Public, plus:</div>
        <ul>
          <li>Basic analytics</li>
          <li>Surveys</li>
          <li>Debates for 2 persons</li>
        </ul>
      </div>
      <Button label="Upgrade now" class="w-full mt-6 mb-2" />
      <div class="text-sm font-normal w-full text-center text-600">Billed annually for $108</div>
    </div>
    <div class="w-18rem card shadow-1 h-31rem flex flex-wrap align-content-start">
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem">
        <div class="flex flex-wrap text-3xl text-800 font-bold justify-content-center align-content-center h-full">Team</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-bold"><account></account></div>
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-normal">3+</div>
        </div>
      </div>
      <div class="h-4rem w-full flex">
        Ideal for public person with team, includes capabilities for enhanced collaboration and productivity
      </div>
      <div class="w-full justify-content-start flex flex-row h-3rem my-4">
        <div class="flex flex-wrap text-5xl text-800 font-bold justify-content-center align-content-center h-full">$9</div>
        <div class="flex flex-wrap text-1xl text-400 justify-content-start">
          <div class="w-full inline"><span class="font-bold">/user/month max 100 users</span><br/><span>minimum 3 seats</span></div>
        </div>
      </div>
      <div class="w-full surface-100 h-10rem">
        <div class="font-semibold p-3">Everything in Pro, plus:</div>
        <ul>
          <li>Team work</li>
          <li>Advanced analytics</li>
          <li>Custom pages</li>
          <li>Photo gallery</li>
          <li>Debates up to 5 persons</li>
        </ul>
      </div>
      <Button label="Upgrade now" class="w-full mt-6 mb-2" />
      <div class="text-sm font-normal w-full text-center text-600">Billed annually for $324</div>
    </div>
    <div class="w-18rem card shadow-1 h-31rem flex flex-wrap align-content-start">
      <div class="w-full justify-content-between flex flex-row justify-content-center h-3rem">
        <div class="flex flex-wrap text-3xl text-800 font-bold justify-content-center align-content-center h-full">Business</div>
        <div class="flex flex-row text-1xl text-400">
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-bold"><account></account></div>
          <div class="h-full justify-content-center align-content-center flex flex-wrap font-normal">5+</div>
        </div>
      </div>
      <div class="h-4rem w-full flex">
        Ideal for medium and large businesses who need to conduct PR company and build strong customers relationship
      </div>
      <div class="w-full justify-content-start flex flex-row h-3rem my-4">
        <div class="flex flex-wrap text-5xl text-800 font-bold justify-content-center align-content-center h-full">$15</div>
        <div class="flex flex-wrap text-1xl text-400 justify-content-start">
          <div class="w-full inline"><span class="font-bold">/user/month max 100 users</span><br/><span>minimum 5 seats</span></div>
        </div>
      </div>
      <div class="w-full surface-100 h-10rem">
        <div class="font-semibold p-3">Everything in Team, plus:</div>
        <ul>
          <li>Corporate page</li>
          <li>Roles for team</li>
          <li>Promotion</li>
          <li>Personal support</li>
        </ul>
      </div>
      <Button label="Upgrade now" class="w-full mt-6 mb-2" />
      <div class="text-sm font-normal w-full text-center text-600">Billed annually for $900</div>
    </div>

  </div>
</template>

<script>
  import Divider from 'primevue/divider/Divider';
  import RadioButton from 'primevue/radiobutton';
  import Button from 'primevue/button';
  import { ref } from 'vue';
  import Account from 'vue-material-design-icons/Account.vue';

  export default {
    setup() {
      const tarif = ref('bsc')
      const update = () => {
        console.log("update")
      }

      return { tarif, update }
    },
    components: {
      Divider, RadioButton, Button, Account
    }
  }
</script>

