export default function convertDateFromNow(date) {
    let today = new Date();
    let calculatedSeconds = Math.abs((today - new Date(date))/1000);

    if (calculatedSeconds >= 31556952) {
        return `${Math.floor(calculatedSeconds/31556952)} year${Math.floor(calculatedSeconds/31556952) >= 2 ? 's': ''}  ago`;
    } else if (calculatedSeconds >= 2592000) {
        return `${Math.floor(calculatedSeconds/2592000)} month${Math.floor(calculatedSeconds/2592000) >= 2 ? 's': ''} ago`;
    } else if (calculatedSeconds >= 86400) {
        return `${Math.floor(calculatedSeconds/86400)} day${Math.floor(calculatedSeconds/86400) >= 2 ? 's': ''} ago`
    } else if (calculatedSeconds >= 3600) {
        return `${Math.floor(calculatedSeconds/3600)} hour${Math.floor(calculatedSeconds/3600) >= 2 ? 's': ''} ago`
    } 
    return `${Math.floor(calculatedSeconds/60)} minute${Math.floor(calculatedSeconds/60) >= 2 ? 's': ''} ago`
}