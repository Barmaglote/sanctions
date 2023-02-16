import LIKE_ADD_MUTATION from '@/queries/likes.add';
import LIKES_INFO_QUERY from '@/queries/likes';
import LIKE_INFO_QUERY from '@/queries/like';

export default ({ app }, inject) => {
  inject('addLike', async (reputationObjectId, isPositive) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: LIKE_ADD_MUTATION,
      variables: {
          "likeInput": { reputationObjectId, isPositive }
        },
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      }
    });

    return { data };
  });

  inject('getLikesInfo', async (reputationObjectId) => {

    const { data } = await app.apolloProvider.defaultClient.query({
      query: LIKES_INFO_QUERY,
      fetchPolicy: 'network-only',
      variables: { reputationObjectId },
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      },
    });

    return { data };
  });

  inject('getLikeInfo', async (reputationObjectId) => {

    const { data } = await app.apolloProvider.defaultClient.query({
      query: LIKE_INFO_QUERY,
      variables: { reputationObjectId },
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      },
    });

    return { data };
  });
}

