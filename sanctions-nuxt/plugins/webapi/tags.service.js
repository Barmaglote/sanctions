import webAxiosInstance from '@/plugins/webapi/web.api';

export default ({ app }, inject) => {    
    inject('fetchTags', async (entity) => {
        const data = await webAxiosInstance.get(`/tags?area=${entity}`);
        return JSON.parse(JSON.stringify(data));
    });
  }

