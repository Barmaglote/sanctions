export default class LinksService {
    getLinks() {
        return fetch('/data/links.json?cache=' + Date.now()).then(res => res.json())
                .then(d => d.data);
    }
}
  