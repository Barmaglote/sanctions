<template>
  <div class="w-full">
    <div class="w-full">
      <p>Dear User,</p>
      <p>We appreciate your decision to confirm your identity and commitment to conduct yourself in a responsible manner on our website. As a platform that values the safety and security of its users, we take identity verification seriously, and we thank you for helping us maintain a trusted community.</p>
      <p>By confirming your identity, you are not only complying with our guidelines, but you are also contributing to the overall trustworthiness of our website. It is our belief that honest and responsible behavior is the key to creating a positive experience for all users.</p>
      <p>Please note that we will keep your information confidential and secure, and we will only use it for verification purposes. We encourage you to continue following our community guidelines and policies, which are designed to ensure a safe and respectful environment for all users.</p>
      <p>Once again, thank you for confirming your identity and commitment to conduct yourself in a responsible manner. We appreciate your contribution to our community.</p>
      <p>Best regards, <br/>Reputation inc.</p>
    </div>
    <div class="w-full flex flex-wrap justify-content-center align-content-center my-5">
      <div class="flex flex-wrap justify-content-center align-content-center"><Checkbox v-model="confirmed" :binary="true" @change="change" id="confirm"/></div>
      <div class="flex flex-wrap justify-content-center align-content-center m-2">I confirm my identity and promise to follow agreement</div>
    </div>
  </div>
</template>

<script>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

export default {
  setup(_,{emit}){
    const confirmed = ref(false)
    const change = () => {
      emit('updateStatus', { confirmed: confirmed.value });
    }

    return { confirmed, change }
  },
  components: {
    Checkbox
  }
}
</script>
