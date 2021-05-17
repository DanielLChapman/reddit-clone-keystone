export default convertCommentCount = (comments) => {
    if (comments < 1000) {
        return comments;
    }
    if (comments < 1000000) {
        let newVal = comments / 1000;
        newVal = newVal.toFixed(1);
        return newVal + "k"
    }
    else {
        let newVal = comments / 1000000;
        newVal = newVal.toFixed(1);
        return newVal + "milion"
    }
}