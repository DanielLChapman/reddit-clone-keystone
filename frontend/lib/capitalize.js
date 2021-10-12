export default function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

export function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = JSON.stringify(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}