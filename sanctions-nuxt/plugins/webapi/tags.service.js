export default ({ app }, inject) => {    
    inject('fetchTags', async (entity) => {
        const data = await app.$webapi().get(`/tags?area=${entity}`);
        return JSON.parse(JSON.stringify(data));
    });
}

