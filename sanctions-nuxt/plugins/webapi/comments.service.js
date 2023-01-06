import COMMENTS_ADD_MUTATION from '@/queries/comments.add';

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

        console.log(data)

        return { data: { profile : data.addProfile } };
    });
}
