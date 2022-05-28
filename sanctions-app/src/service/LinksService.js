export default class LinksService {
    getLinks() {
        return fetch('/data/links.json').then(res => res.json())
                .then(d => d.data);
    }
}
  