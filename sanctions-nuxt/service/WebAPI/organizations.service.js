import webAxiosInstance from './web.api';

export default class OrganizationsService {
    getOrganizations() {
        return webAxiosInstance.get('/organizations?cache=' + Date.now()).then(d => d.data);
    }
}
  