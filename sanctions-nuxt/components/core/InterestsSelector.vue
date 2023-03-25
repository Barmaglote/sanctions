<template>
  <div class="flex flex-wrap w-full">
    <div>
      <div class="p-inputgroup">
        <InputText placeholder="Keyword" v-model="tag" :disabled="items?.length >= maxArrayLength"/>
        <Button icon="pi pi-plus" class="p-button-warning" label="Add" :disabled="items?.length >= maxArrayLength" @click="addItem();$emit('input', items)"/>
      </div>
    </div>
    <div class="w-full py-3">
      <Chip v-for="item, i in items" :key="item" :label="item" class="mr-2 mb-2" removable @remove="remove(item);$emit('input', items)"/>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue';
  import InputText from 'primevue/inputtext/InputText';
  import Button from 'primevue/button/Button';
  import Chip from 'primevue/chip';

  export default {
    setup({value, maxArrayLength, maxTagLength}){

      const MIN_TAG_LENGTH = 2;

      const items = ref([])
      const tag = ref(null)

      onMounted(() => {
        items.value = value
      });

      const addItem = () => {
        if (items?.length >= maxArrayLength) {
          return;
        }

        if (!tag?.value || tag?.value?.length > maxTagLength || tag?.value?.length < MIN_TAG_LENGTH) {
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


        items.value = items?.value.filter(x => x != item)
      }

      return { items, addItem, tag, remove, maxArrayLength }
    },
    components: {
      InputText, Button, Chip
    },
    props: {
      value: {
        type: [],
        default: []
      },
      maxArrayLength: {
        type: Number,
        default: 30
      },
      maxTagLength: {
        type: Number,
        default: 20
      }
    },
  }
</script>
