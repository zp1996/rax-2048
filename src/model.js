import { getCollection } from './config/number';

class Model {
    constructor(size) {
        this.size = size;
        this.len = size * size;

        const { data, hash } = getCollection(),
            { pieces, empty } = this.initPieces();
        this.pieces = pieces;
        this.data = data;
        this.hash = hash;
        this.initData = [ this.data[0], this.data[1] ];
        this.empty = empty;
    }
    randomVal() {
        return Math.random() < 0.85 ? this.initData[0] : this.initData[1];
    }
    randomPos() {
        const keys = Object.keys(this.empty),
            index = ~~(Math.random() * this.len),
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
    clear() {
        this.pieces = this.initPieces(this.size);
    }
    restart() {
        this.clear();
        this.init();
    }
}

export default Model;
