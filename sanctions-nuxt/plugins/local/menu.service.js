export default ({ app }, inject) => {    
    inject('getMenu', async () => {
        const res = await fetch('/data/menu.json');
        const { data } = await res.json();
        return data;
    });
  }
