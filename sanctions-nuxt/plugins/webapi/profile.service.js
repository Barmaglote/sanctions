import PROFILES_QUERY from '@/queries/profiles';
import PROFILES_ADD_MUTATION from '@/queries/profiles.add';
import PROFILES_UPDATE_MUTATION from '@/queries/profiles.update';

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

    inject('createProfile', async (nickname) => {
      const { data } = await app.apolloProvider.defaultClient.mutate({
        mutation: PROFILES_ADD_MUTATION,
        variables: { nickname },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
          }
        }
      });
      return { data: { profile : data.addProfile } };
    });

    inject('updateProfile', async (profile) => {
        const { data } = await app.apolloProvider.defaultClient.mutate({
            mutation: PROFILES_UPDATE_MUTATION,
            variables: { profile },
            context: {
                headers: {
                    Authorization: app.$auth.strategy.token.get()
                }
            }
        });

        return { data: { profile : data.updateProfile } };
    });
}
