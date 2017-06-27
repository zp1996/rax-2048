import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Row from '../row/index';
import styles from './index.css';

const ScoreItem = ({ title, num }) => (
    <View style={styles.score}>
        <Text style={styles.scoreTitle}>{ title }</Text>
        <Text style={styles.scoreNum}>{ num }</Text>
    </View>
);

const Menu = ({ text }) => (
    <View style={styles.menu}>
        { text }
    </View>
);

export default ({ score, best }) => {
    return (
        <Row>
            {
                [
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>2048</Text>
                    </View>,
                    <View>
                        <ScoreItem title="得分" num={score} />
                        <Menu text="菜单" />
                    </View>,
                    <View>
                        <ScoreItem title="最高分" num={best} />
                        <Menu text="新游戏" />
                    </View>
                ]
            }
        </Row>
    );
};
