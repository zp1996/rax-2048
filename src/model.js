import { getValue } from './config/index';

class Model {
    constructor(size, type = 'number') {
        this.size = size;
        this.len = size * size;

        const { data, hash } = getValue(type),
            { pieces, empty } = this.initPieces();
        this.pieces = pieces;
        this.data = data;
        this.hash = hash;
        this.empty = empty;
    }
    randomVal() {
        return Math.random() < 0.85 ? this.data[0] : this.data[1];
    }
    randomPos() {
        const keys = Object.keys(this.empty),
            index = ~~(Math.random() * keys.length),
            key = keys[index];
        delete this.empty[key];
        return key.split(',');
    }
    initPieces() {
        const pieces = new Array(this.size),
            empty = {};
        for (let i = 0; i < this.size; i++) {
            pieces[i] = new Array(this.size);
            for (let j = 0; j < this.size; j++) {
                pieces[i][j] = 0;
                empty[`${i},${j}`] = true;
            }
        }
        return { pieces, empty };
    }
    newPoint() {
        const [ x, y ] = this.randomPos();
        this.pieces[x][y] = this.randomVal();
    }
    init() {
        // 初始化两个点
        // this.newPoint();
        // this.newPoint();
        this.pieces[0][0] = 4;
        // this.pieces[0][1] = 4;
        this.pieces[0][3] = 2;
        this.pieces[0][2] = 2;
        delete this.empty['0,0'];
        // delete this.empty['0,1'];
        delete this.empty['0,2'];
        delete this.empty['0,3'];
        return this.pieces;
    }
    baseChange(fn) {
        fn();
        this.newPoint();
        return this.pieces;
    }
    baseRemove(temp, index, r, arr, getIndex, flag) {
        const { length } = temp;
        let i = 0, emptyIndex = getIndex.empty(index, length, flag);
        delete this.empty[`${r},${getIndex.remove(index)}`];
        for ( ; i < length; i++) {
            arr[getIndex.index(index, i)] = temp[length - i - 1];
        }
        arr[emptyIndex] = 0;
        this.empty[`${r},${emptyIndex}`] = true;
    }
    levelBase(condition) {     // 水平方向上移动
        return this.baseChange(() => {
            for (let r = 0; r < this.size; r++) {
                const {
                    getVal, judge, getAdd,
                    judgeAdd, toNext, getIndex, changeEmpty
                } = condition();
                const arr = this.pieces[r];
                const temp = [];
                while (judge()) {
                    let { index, next } = getVal();
                    if (arr[index] === 0) {
                        continue;
                    } else if (arr[index] === arr[next]) {
                        const add = getAdd();
                        arr[next] = this.data[
                            this.hash[arr[index]] + 1
                        ];
                        arr[index] = 0;
                        changeEmpty(r, index);
                        if (judgeAdd(add) && arr[add] === 0) {
                            arr[add] = arr[next];
                            arr[next] = 0;
                            changeEmpty(r, next);
                            index = next;
                        }
                        // temp.length && this.baseRemove(temp, index, r, arr, getIndex, true);
                        // temp.push(arr[next]);
                        toNext();
                    } else if (arr[next] === 0) {
                        arr[next] = arr[index];
                        arr[index] = 0;
                        changeEmpty(r, index, temp);
                        this.baseRemove(temp, index, r, arr, getIndex);
                    } else {
                        temp.push(arr[index]);
                    }
                }
            }
            console.log(this.empty);
        });
    }
    right() {
        const condition = () => {
            let i = 0, index = null;
            return {
                judge: () => i++ < this.size,
                getVal: () => {
                    index = i - 1;
                    return { index, next: index + 1 };
                },
                getAdd: () => index + 2,
                judgeAdd: val => val <= this.size,
                toNext: () => i += 2,
                getIndex: {
                    empty: (index, length, flag) => {
                        const res = index - length;
                        console.log(res);
                        return flag ? res - 1 : res;
                    },
                    index: (index, i) => index - i,
                    remove: index => index + 1
                },
                changeEmpty: (row, col, temp = []) => {
                    delete this.empty[`${row},${col + 1}`];
                    this.empty[`${row},${col - temp.length}`] = true;
                }
            };
        };
        return this.levelBase(condition);
    }
    left() {
        const condition = () => {
            let i = 0, index = null;
            return {
                judge: () => i++ < this.size,
                getVal: () => {
                    index = this.size - i;
                    return { index, next: index - 1 };
                },
                getAdd: () => index - 2,
                judgeAdd: val => val >= 0,
                toNext: () => i += 2,
                getIndex: {
                    empty: (index, length, flag) => {
                        const res = index + length;
                        return flag ? res + 1 : res;
                    },
                    index: (index, i) => index + i,
                    remove: index => index
                },
                changeEmpty: (row, col) => {
                    delete this.empty[`${row},${col - 1}`];
                    this.empty[`${row},${col}`] = true;
                }
            };
        };
        return this.levelBase(condition);
    }
    clear() {
        this.pieces = this.initPieces(this.size);
    }
    restart() {
        this.clear();
        this.init();
    }
}

export default Model;
