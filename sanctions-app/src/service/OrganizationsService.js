export default class OrganizationsService {
	getOrganizations() {
		return fetch('/data/sanctions/organizations.json?cache=' + Date.now()).then(res => res.json()).then(d => d.data);
    }
}

    