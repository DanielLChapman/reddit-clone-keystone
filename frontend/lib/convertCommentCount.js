export default function convertCommentCount(comments) {
    if (comments < 1000) {
        return comments.toString();
    }
    if (comments < 1000000) {
        let newVal = comments / 1000;
        newVal = newVal.toFixed(1);
        return newVal + " k"
    }
    else {
        let newVal = comments / 1000000;
        newVal = newVal.toFixed(1);
        if (newVal.toString() === '1.0') {
            newVal = 1;
        }
        return newVal + " million"
    }
}