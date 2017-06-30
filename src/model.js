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
        this.newPoint();
        this.newPoint();
        return this.pieces;
    }
    changeEmpty(row, col) {
        delete this.empty[`${row},${col - 1}`];
        this.empty[`${row},${col}`] = true;
    }
    baseChange(fn) {
        fn();
        this.newPoint();
        return this.pieces;
    }
    baseRemove(temp, index, r, arr) {
        const { length } = temp;
        let i = 0, emptyIndex = index + length;
        delete this.empty[`${r},${index}`];
        for ( ; i < length; i++) {
            arr[index + i] = temp[length - i - 1];
        }
        arr[emptyIndex] = 0;
        this.empty[`${r},${emptyIndex}`] = true;
    }
    levelBase(condition) {     // 水平方向上移动
        return this.baseChange(() => {
            for (let r = 0; r < this.size; r++) {
                const { getVal, judge, getAdd, judgeAdd, toNext } = condition();
                const arr = this.pieces[r];
                const temp = [];
                while (judge()) {
                    const { index, next } = getVal();
                    if (arr[index] === 0) {
                        continue;
                    } else if (arr[index] === arr[next]) {
                        const add = getAdd();
                        arr[next] = this.data[
                            this.hash[arr[index]] + 1
                        ];
                        arr[index] = 0;
                        this.changeEmpty(r, index);
                        if (judgeAdd(add) && arr[add] === 0) {
                            arr[add] = arr[next];
                            arr[next] = 0;
                            this.changeEmpty(r, next);
                        }
                        toNext();
                    } else if (arr[next] === 0) {
                        arr[next] = arr[index];
                        arr[index] = 0;
                        this.changeEmpty(r, index);
                        this.baseRemove(temp, index, r, arr);
                    } else {
                        temp.push(arr[index]);
                    }
                }
            }
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
                toNext: () => i++
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
                toNext: () => i++
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
