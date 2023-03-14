<template>
  <div class="flex flex-wrap w-full">
    <div>
      <div class="p-inputgroup">
        <InputText placeholder="Keyword" v-model="tag"/>
        <Button icon="pi pi-plus" class="p-button-warning" label="Add" @click="addItem()"/>
      </div>
    </div>
    <div class="w-full py-3">
      <Chip v-for="item, i in items" :key="i" :label="item" class="mr-2 mb-2" removable @remove="remove(item)"/>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext/InputText';
  import Button from 'primevue/button/Button';
  import Chip from 'primevue/chip';

  const MAX_TAG_LENGTH = 30;

  export default {
    setup(){
      const items = ref([])
      const tag = ref(null)

      const addItem = () => {
        if (!tag?.value || tag?.value?.length > MAX_TAG_LENGTH) {
          return;
        }

        if (items?.value.indexOf(tag.value) > -1) {
          return;
        }

        items?.value.push(tag.value);
        tag.value = null;
      }

      const remove = (item) => {
        if (!item) {
          return;
        }

        if (items?.value.indexOf(item) < 0) {
          return;
        }

        items.value = items?.value.filter(x => x !== item)
      }

      return { items, addItem, tag, remove }
    },
    components: {
      InputText, Button, Chip
    }
  }
</script>
