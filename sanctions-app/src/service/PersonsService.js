export default class PersonsService {
	getPersons() {
		return fetch('/data/sanctions/persons.json?cache=' + Date.now()).then(res => res.json()).then(d => d.data);
    }
}

    