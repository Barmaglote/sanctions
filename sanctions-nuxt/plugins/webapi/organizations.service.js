import webAxiosInstance from '@/plugins/webapi/web.api';

export default ({ app }, inject) => {    
    inject('fetchOrganizations', async () => {
        const data = await webAxiosInstance.get('/organizations');
        return JSON.parse(JSON.stringify(data));
    });
  }