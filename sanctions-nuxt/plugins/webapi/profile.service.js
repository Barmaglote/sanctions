export default ({ app }, inject) => {    
    // private settings
    inject('fetchPrivateProfile', async (entity) => {      
        const data = await app.$webapi().get(`/profiles/private`);
        return JSON.parse(JSON.stringify(data));
    });

    // public data
    inject('fetchPublicProfile', async (entity) => {         
        const data = await app.$webapi().get(`/profiles/public`); 
        return JSON.parse(JSON.stringify(data));
    });

    // update data
    inject('updateProfile', async (entity) => {         
        const data = await app.$webapi().put(`/`, entity); 
        return JSON.parse(JSON.stringify(data));
    });

    // createProfile
    inject('createProfile', async (nickname) => {       
        console.log("nickname", nickname)
        const data = await app.$webapi().post(`/`, nickname);
        console.log("nickname", data)
        return JSON.parse(JSON.stringify(data));
    });    
}

