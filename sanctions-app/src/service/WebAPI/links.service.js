import webAxiosInstance from './web.api';

export default class LinksService {
    getLinks() {
        return webAxiosInstance.get('/links?cache=' + Date.now()).then(d => d.data);
    }
}
  