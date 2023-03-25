import POSTS_ADD_MUTATION from '@/queries/posts.add';
//import COMMENTS_GET_QUERY from '@/queries/comments.get';

export default ({ app }, inject) => {
  inject('addPost', async (post, tags) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: POSTS_ADD_MUTATION,
        variables: {
            "postInput": { post, tags }
          },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
            }
          }
      });
      return { data };
  });

  /*
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
  */
}
