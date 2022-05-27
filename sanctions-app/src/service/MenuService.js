export default class MenuService {
    getMenu() {
        return fetch('/data/menu.json').then(res => res.json())
                .then(d => d.data);
    }
}
  