import getNumberCollection from './number';

let collection = null;

const types = {
    number: getNumberCollection(),
};

const after = [
    'first',
    'second',
    'third',
    'forth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth'
];

export const getValue = type => collection = types[type];

export const getStylesName = (type) => {
    const res = {};
    getValue(type).data.forEach((c, i) => {
        res[c] = `val-${after[i]}`;
    });
    return res;
};
