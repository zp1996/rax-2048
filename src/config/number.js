export const getCollection = () => {
    let val = 2, index = 0;
    const data = [], hash = {};
    while (val <= 2048) {
        data.push(val);
        hash[val] = index++;
        val *= 2;
    }
    return { data, hash };
};

export const stylesName = {
    '2': 'val-first'
};
