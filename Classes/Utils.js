class Utils {
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    static arrayDiff(arr1, arr2) {
        return arr1.filter(val => !arr2.includes(val)).concat(arr2.filter(val => !arr1.includes(val)))
    }
}

module.exports = Utils