export default ({ app }, inject) => {    
    inject('fetchPersons', async (lazyParams) => {
        const data = await app.$webapi().get('/persons?params='+JSON.stringify(lazyParams));
        return JSON.parse(JSON.stringify(data));
    });    
  }