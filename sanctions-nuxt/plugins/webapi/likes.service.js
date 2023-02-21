import LIKE_ADD_MUTATION from '@/queries/likes.add';
import LIKES_INFO_QUERY from '@/queries/likes';
import LIKE_INFO_QUERY from '@/queries/like';
import LIKES_FEED_QUERY from '@/queries/likes.user';

export default ({ app }, inject) => {
  inject('addLike', async (reputationObjectId, isPositive, reputationObjectType) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: LIKE_ADD_MUTATION,
      variables: {
          "likeInput": { reputationObjectId, isPositive, reputationObjectType }
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

  inject('getLikesFeed', async (userId, page) => {

    const { data } = await app.apolloProvider.defaultClient.query({
      query: LIKES_FEED_QUERY,
      variables: { userId, page },
      context: {
        headers: {
          Authorization: app.$auth.strategy.token.get()
        }
      },
    });

    return { data };
  });
}

