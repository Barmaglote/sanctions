export default class PersonsService {
	getPersons() {
		return fetch('data/persons.json').then(res => res.json()).then(d => d.data);
    }
}

    