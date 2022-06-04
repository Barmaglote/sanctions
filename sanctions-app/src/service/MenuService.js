export default class MenuService {
    getMenu() {
        return fetch('/data/menu.json?cache=' + Date.now()).then(res => res.json())
                .then(d => d.data);
    }
}
  