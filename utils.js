const hashCode = (s) => {
    let hash = 0
    let chr;
    if (s.length === 0) return hash;
    for (let i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    hash = hash < 0 ? -hash : hash;
    return hash;
};

module.exports = hashCode