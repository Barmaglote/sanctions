const LinksModel = require('../../models/links/model.js');
const CACHE_TTL_SEC = 100000;

module.exports.Links = () => {

    let links_cache = {};
    let date_cache = new Date().getTime();

    const links = async(type) => {
        if (!type && (!links_cache[type] || (new Date().getTime() - date_cache > CACHE_TTL_SEC))) {
            links_cache['ALL'] = await LinksModel.find({});
            date_cache = new Date().getTime();
        }
    
        if (type && (!links_cache[type] || (new Date().getTime() - date_cache > CACHE_TTL_SEC))) {
            links_cache[type] = await LinksModel.find({type});
            date_cache = new Date().getTime(); 
        }
    
        return type ? links_cache[type] : links_cache['ALL'];
    }

    return links;
};