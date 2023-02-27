import COMMENTS_ADD_MUTATION from '@/queries/comments.add';
import COMMENTS_GET_QUERY from '@/queries/comments.get';

export default ({ app }, inject) => {
  inject('addComment', async (comment, parentId, reputationObjectId) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: COMMENTS_ADD_MUTATION,
        variables: {
            "commentInput": { comment, parentId, reputationObjectId }
          },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
            }
          }
      });
      return { data };
  });

  inject('getComments', async (reputationObjectId, lazyLoadEvent) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: COMMENTS_GET_QUERY,
        variables: {
            reputationObjectId, lazyLoadEvent
        },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
          }
        }
      });
      return { data };
  });
}
