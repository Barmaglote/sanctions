export default class OrganizationsService {
	getOrganizations() {
		return fetch('/data/sanctions/organizations.json').then(res => res.json()).then(d => d.data);
    }
}

    