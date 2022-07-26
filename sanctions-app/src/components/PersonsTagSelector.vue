<template>
    <Tree :value="nodes" selectionMode="checkbox" v-model:selectionKeys="selectedKeys" @nodeSelect="onNodeSelect" @nodeUnselect="onNodeUnselect"></Tree>
</template>

<script>
import { useTagsStore } from './../stores/tags';
import Tree from 'primevue/tree';
import TagService from './../service/WebAPI/TagService';

export default {
    data() {
        return {
            selectedKeys: null, 
            tagsStore: null,
            tagService: null,
        }
    },
    created() {
		this.tagsStore = useTagsStore();
    },
    computed: {
      nodes() {
          return this.tagsStore.tags;
        }
    },
    components: { Tree },    
    methods: {
        onNodeSelect(node) {
            if (node.children) {
                node.children.forEach(item => {
                    this.tagsStore.addSelectedTag(item);    
                });                
            } else {
                this.tagsStore.addSelectedTag(node);
            }            
        },
        onNodeUnselect(node) {
            if (node.children) {
                node.children.forEach(item => {
                    this.tagsStore.deleteSelectedTag(item);    
                });                
            } else {
                this.tagsStore.deleteSelectedTag(node);
            }            
        }
    }
}
</script>