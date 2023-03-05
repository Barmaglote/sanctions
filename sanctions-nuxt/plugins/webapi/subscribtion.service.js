import SUBSCRIBTION_UPDATE_MUTATION from '@/queries/subscribtions.update';
import SUBSCRIBTION_IS_SUBSCRIBED_QUERY from '@/queries/subscribtions';

export default ({ app }, inject) => {
  inject('updateSubscribtion', async (reputationObjectId, reputationObjectType, userId) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: SUBSCRIBTION_UPDATE_MUTATION,
      variables: {
          "subscribtionInput": { reputationObjectId, reputationObjectType, userId }
        },
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      }
    });

    return { data };
  });

  inject('isSubscribed', async (userId, reputationObjectId) => {
    const { data } = await app.apolloProvider.defaultClient.query({
        query: SUBSCRIBTION_IS_SUBSCRIBED_QUERY,
        variables: { userId, reputationObjectId },
        context: {
            headers: {
                Authorization: app.$auth.strategy.token.get()
            }
        }
    });

    return { data };
});
}

