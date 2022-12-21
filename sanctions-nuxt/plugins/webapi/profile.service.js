import PROFILES_QUERY from '@/queries/profiles';
export default ({ app }, inject) => {    
    inject('fetchPrivateProfile', async () => {        
        const { data } = await app.apolloProvider.defaultClient.query({
            query: PROFILES_QUERY,
            variables: { nickname: null },
            context: {
                headers: {
                    Authorization: app.$auth.strategy.token.get()
                }
            }
        });

        return { data };
    }); 

    inject('fetchPublicProfile', async (nickname) => {        
        const { data } = await app.apolloProvider.defaultClient.query({
            query: PROFILES_QUERY,
            variables: { nickname },
            context: {
                headers: {
                    Authorization: app.$auth.strategy.token.get()
                }
            }
        });

        return { data };
    });

    // TODO: Not ready
    inject('createProfile', async (nickname) => {        
        const { data } = await app.apolloProvider.defaultClient.query({
            query: PROFILES_QUERY,
            variables: { nickname },
            context: {
                headers: {
                    Authorization: app.$auth.strategy.token.get()
                }
            }
        });

        return { data };
    });         
}