import PERSONS_QUERY from '@/queries/links'

export default ({ app }, inject) => {    
    inject('fetchLinks', async (type) => {        

        const { data } = await app.apolloProvider.defaultClient.query({
            query: PERSONS_QUERY,
            variables: { type }
        });

        return { data: data.links };
    });    
  }