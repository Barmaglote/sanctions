export default class TagService {
    getTagNodes(entity) {
        return fetch(`/data/sanctions/${entity}-tags.json?cache=` + Date.now()).then(res => res.json())
                .then(d => d.data);
    }
}
  