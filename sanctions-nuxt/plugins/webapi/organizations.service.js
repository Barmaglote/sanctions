export default ({ app }, inject) => {    
    inject('fetchOrganizations', async (lazyParams) => {
        const data = await app.$webapi().get('/organizations?params='+JSON.stringify(lazyParams));
        return JSON.parse(JSON.stringify(data));
    });        
  }