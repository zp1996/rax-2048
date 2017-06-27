import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Link from 'rax-link';
import Header from './header/index';
import Row from './row/index';
import styles from './App.css';

const padding = 20,
    size = 690,
    len = 4;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            best: this.getBest()
        };
    }
    getBest() {
        return Number(localStorage.getItem('best') || 0);
    }
    getBoard() {
        const res = [],
            totalWidth = size - padding * (len + 1),
            height = ~~(totalWidth / 4);
        for (let i = 0; i < len; i++) {
            res.push(
                <Row totalWidth={totalWidth} height={height}
                    styleMore={[styles.boardRow]}>
                    <View style={styles.test}></View>
                    <View style={styles.test}></View>
                    <View style={styles.test}></View>
                    <View style={styles.test}></View>
                </Row>
            );
        }
        return res;
    }
    render() {
        const { score, best } = this.state;
        styles.board.padding = padding;
        return (
            <View style={styles.wrapper}>
                <View style={[styles.main, styles.baseAllIn]}>
                    <Header score={score} best={best} />
                    <Text style={styles.description}>
                        合并这些数字可以得到2048方块！
                    </Text>
                    <View style={styles.board}>
                        { this.getBoard() }
                    </View>
                    <Link href="https://github.com/zp1996" style={styles.footer}>
                        write by zp1996    
                    </Link>
                </View>
            </View>
        );
    }
}

export default App;
