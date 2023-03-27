import POSTS_ADD_MUTATION from '@/queries/posts.add';
import POSTS_GET_QUERY from '@/queries/posts.get';

export default ({ app }, inject) => {
  inject('addPost', async (post, tags, preview, title) => {
    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: POSTS_ADD_MUTATION,
        variables: {
            "postInput": { post, tags, preview, title }
          },
        context: {
          headers: {
            Authorization: app.$auth.strategy.token.get()
            }
          }
      });
      return { data };
  });

  inject('getPosts', async (authorId, lazyLoadEvent) => {

    const { first, rows, sortField, sortOrder, filters } = lazyLoadEvent;

    const { data } = await app.apolloProvider.defaultClient.mutate({
      mutation: POSTS_GET_QUERY,
      variables: {
        authorId,
        "lazyLoadEvent": {
            "filters": {
                "tags": filters?.tags?.value || null,
                "title": filters?.title?.value === "" ? null : filters?.title || null
            },
            "first": first,
            "rows": rows,
            "sortField": sortField,
            "sortOrder": sortOrder?.toString()
        }
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
