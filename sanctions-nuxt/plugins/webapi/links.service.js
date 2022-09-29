import webAxiosInstance from '@/plugins/webapi/web.api';

export default ({ app }, inject) => {    
    inject('fetchLinks', async () => {
        const data = await webAxiosInstance.get('/links');
        return JSON.parse(JSON.stringify(data));
    });
}