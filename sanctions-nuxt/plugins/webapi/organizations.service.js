import ORGANINAZIONS_QUERY from '@/queries/organizations'

export default ({ app }, inject) => {    
    inject('fetchOrganizations', async (lazyParams) => {
        
        const { first, rows, sortField, sortOrder, filters } = lazyParams.value;

        const { data } = await app.apolloProvider.defaultClient.query({
            query: ORGANINAZIONS_QUERY, 
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

        return {
            data: {
                result: data.organizations,
                total: data.organizationsTotal
            }
        };
    });    
  }