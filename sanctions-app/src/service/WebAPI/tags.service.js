import webAxiosInstance from './web.api';

export default class TagService {
    getTagNodes(entity) {
        return webAxiosInstance.get(`/tags?area=${entity}&cache=` + Date.now()).then(d => d.data);

        /*
        return fetch(`/data/sanctions/${entity}-tags.json?cache=` + Date.now()).then(res => res.json())
                .then(d => d.data);
                */
    }
}
  