const naiveIsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;


export function formatDate(value) {
    if (!naiveIsoDateRegex.test(value)) { return ''; }
    const date = new Date(value);
    return `${new String(date.getDay()).padStart(2, '0')}.${new String(date.getMonth()).padStart(2,'0')}.${new String(date.getFullYear()).padStart(4,'0')} at ${new String(date.getHours()).padStart(2, '0')}:${new String(date.getMinutes()).padStart(2, '0')}`
}