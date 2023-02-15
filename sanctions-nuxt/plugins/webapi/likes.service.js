import LIKE_ADD_MUTATION from '@/queries/likes.add';
import LIKES_INFO_MUTATION from '@/queries/likes';

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
      query: LIKES_INFO_MUTATION,
        variables: { reputationObjectId },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
            }
          }
    });

    return { data };
  });
}
