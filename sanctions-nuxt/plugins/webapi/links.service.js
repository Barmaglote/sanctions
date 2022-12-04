

export default ({ app }, inject) => {    
    inject('fetchLinks', async () => {
        const data = await app.$webapi().get('/links');
        return JSON.parse(JSON.stringify(data));
    });
}