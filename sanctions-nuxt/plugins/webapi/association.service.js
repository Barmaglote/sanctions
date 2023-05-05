import ASSOCIATION_ADD_QUERY from '@/queries/association.add'

export default ({ app }, inject) => {
    inject('requestAssociation', async (request) => {

        const { first, rows, sortField, sortOrder, filters } = lazyParams.value;

        const { data } = await app.apolloProvider.defaultClient.query({
            query: ASSOCIATION_ADD_QUERY,
            variables: {
                "lazyLoadEvent": {
                    "filters": {
                        "tags": filters?.tags?.value || null,
                        "title": filters?.title?.value === "" ? null : filters?.title || null
                    },
                    "first": first,
                    "rows": rows,
                    "sortField": sortField,
                    "sortOrder": sortOrder.toString()
                }
            }
        });

        return { data };
    });
  }
