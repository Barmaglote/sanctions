import webAxiosInstance from './web.api';

export default class PersonsService {
    getPersons() {
        return webAxiosInstance.get('/persons?cache=' + Date.now()).then(d => d.data);
    }
}
  