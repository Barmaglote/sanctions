import instance from './web.api';

export default class LinksService {
    getLinks() {
        return instance.get('/links?cache=' + Date.now()).then(d => d.data);
    }
}
  