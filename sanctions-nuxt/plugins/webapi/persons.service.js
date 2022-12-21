import PERSONS_QUERY from '@/queries/persons'

export default ({ app }, inject) => {    
    inject('fetchPersons', async (lazyParams) => {
        
        const { first, rows, sortField, sortOrder, filters } = lazyParams.value;

        const { data } = await app.apolloProvider.defaultClient.query({
            query: PERSONS_QUERY, 
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
                result: data.persons,
                total: data.personsTotal
            }
        };
    });    
  }