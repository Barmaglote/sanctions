<template>
  <div class="flex flex-wrap w-full">
    <div>
      <div class="p-inputgroup">
        <InputText placeholder="Keyword" v-model="tag" :disable="items?.length >= MAX_ARRAY_LENGTH"/>
        <Button icon="pi pi-plus" class="p-button-warning" label="Add" @click="addItem();$emit('input', items)"/>
      </div>
    </div>
    <div class="w-full py-3">
      <Chip v-for="item, i in items" :key="i" :label="item" class="mr-2 mb-2" removable @remove="remove(item);$emit('input', items)"/>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import InputText from 'primevue/inputtext/InputText';
  import Button from 'primevue/button/Button';
  import Chip from 'primevue/chip';

  export default {
    setup({value}){

      const MIN_TAG_LENGTH = 2;
      const MAX_TAG_LENGTH = 30;
      const MAX_ARRAY_LENGTH = 30;

      const items = ref([])
      const tag = ref(null)

      onMounted(() => {
        items.value = value
      });

      const addItem = () => {
        if (!tag?.value || tag?.value?.length > MAX_TAG_LENGTH || tag?.value?.length < MIN_TAG_LENGTH) {
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

      return { items, addItem, tag, remove, MAX_ARRAY_LENGTH }
    },
    components: {
      InputText, Button, Chip
    },
    props: {
      value: {
        type: [],
        default: []
      }
    },
  }
</script>
