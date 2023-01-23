const naiveIsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;


export function formatDate(value) {
    if (!naiveIsoDateRegex.test(value)) { return ''; }
    const date = parseISOString(value)
    return `${new String(date.getUTCDate()).padStart(2, '0')}.${new String(date.getUTCMonth()+1).padStart(2,'0')}.${new String(date.getUTCFullYear()).padStart(4,'0')} at ${new String(date.getUTCHours()).padStart(2, '0')}:${new String(date.getUTCMinutes()).padStart(2, '0')}`
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
