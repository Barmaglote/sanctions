export default class PersonsService {
	getPersons() {
		return fetch('/data/sanctions/persons.json').then(res => res.json()).then(d => d.data);
    }
}

    