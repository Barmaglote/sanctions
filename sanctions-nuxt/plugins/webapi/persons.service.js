import webAxiosInstance from '@/plugins/webapi/web.api';

export default ({ app }, inject) => {    
    inject('fetchPersons', async () => {
        const data = await app.$webapi().get('/persons');
        return JSON.parse(JSON.stringify(data));
    });
  }