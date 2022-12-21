<template>
    <div v-if="nodes.length > 0">    
        <Tree :value="nodes" selectionMode="checkbox" :selectionKeys.sync="selectedKeys" @node-select="onNodeSelect" @node-unselect="onNodeUnselect"></Tree>
    </div>
</template>

<script>
import { useTagsStore } from '@/store/tags'
import Tree from 'primevue/tree'
import { computed, ref } from 'vue'

export default {
    setup( { items } ) {
		const tagsStore = useTagsStore();
        tagsStore.setTags(items);
        const selectedKeys = ref(null)

        const onNodeSelect = (node) => {
            if (node.children) {
                node.children.forEach(item => {
                    tagsStore.addSelectedTag(item);    
                });                
            } else {
                tagsStore.addSelectedTag(node);
            }            
        }

        const onNodeUnselect = (node) => {
            if (node.children) {
                node.children.forEach(item => {
                    tagsStore.deleteSelectedTag(item);    
                });                
            } else {
                tagsStore.deleteSelectedTag(node);
            }
        }

        let nodes = computed(() => { return tagsStore.tags } );

        return {tagsStore, onNodeSelect, onNodeUnselect, selectedKeys, nodes}
    },
    components: { Tree },
    props: {
            items: {
                type: [],
                default: () => [],
        }, 
    }
}
</script>