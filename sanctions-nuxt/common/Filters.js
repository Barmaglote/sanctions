export function FilterList (items, type, search, fields ) {
    if (!items || !type) return [];
    
    let filtered = items.filter(x => x.type == type);

    if (!search) {	
          return filtered;
    };
    
    let filterVal = search.trim().toLowerCase().split(/\s+/);
    let filterBy = fields || [ 'titlerus', 'titleeng' ];
    return filtered.filter(item => filterBy.some(prop => filterVal.some(val => item[prop].toLowerCase().includes(val))));
}