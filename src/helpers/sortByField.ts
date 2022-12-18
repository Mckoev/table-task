function sortByField(arr, field) {
    return arr.sort((a, b) => {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}

export default sortByField