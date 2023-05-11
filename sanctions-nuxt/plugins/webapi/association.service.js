import ASSOCIATION_ADD_QUERY from '@/queries/associations.add'

export default ({ app }, inject) => {
    inject('requestAssociation', async (request) => {
        const { data } = await app.apolloProvider.defaultClient.mutate({
            mutation: ASSOCIATION_ADD_QUERY,
            variables: {
              associationRequest: {
                type: request.reputationObjectType,
                reputationObject: {
                  titleeng: request.reputationObject.titleeng,
                  _id: request.reputationObject._id
                },
                isNew: request.isNew,
                confirmed: request.confirmed
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
