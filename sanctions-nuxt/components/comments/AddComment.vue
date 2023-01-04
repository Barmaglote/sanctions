<template>
    <div class="card comment-container h-auto">        			
        <TextArea type="text" id="comment" rows="5" v-model="comment" class="h-full" :autoResize="true"/>
        <div class="grid">
            <div class="col-4 col-offset-8 p-text-center justify-content-end flex my-2">
                <Button type="submit" label="Submit" class="align-self-center" :disabled="loading"> 
                        <i class="pi pi-spin pi-spinner mr-2" style="font-size: 1rem" v-show="loading"></i>
                        <span class="text-center" style="width: 100%;">Post</span>                    
                </Button>
            </div>
        </div>
        
    </div>
</template>

<script>
import TextArea from 'primevue/textarea';
import { ref } from 'vue';
import Button from 'primevue/button';

export default {
    setup() {
        const comment = ref('')
        const loading = ref(false)
        return { comment, loading }
    },
    components: { TextArea, Button }
}
</script>

