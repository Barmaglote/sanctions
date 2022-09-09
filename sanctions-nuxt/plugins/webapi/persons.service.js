import webAxiosInstance from '@/plugins/webapi/web.api';

export default ({ app }, inject) => {    
    inject('fetchPersons', async () => {
        const data = await webAxiosInstance.get('/persons');
        return JSON.parse(JSON.stringify(data));
    });
  }