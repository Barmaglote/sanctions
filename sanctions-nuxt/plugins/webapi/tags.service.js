import TAGS_QUERY from '@/queries/tags'

export default ({ app }, inject) => {    
    inject('fetchTags', async (area) => {        

        const { data } = await app.apolloProvider.defaultClient.query({
            query: TAGS_QUERY,
            variables: { area }
        });

        return { data: data.tags };
    });    
}