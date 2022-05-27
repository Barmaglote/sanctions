export default class TagService {
    getTagNodes(entity) {
        return fetch(`/data/sanctions/${entity}-tags.json`).then(res => res.json())
                .then(d => d.data);
    }
}
  