import { createElement, Component } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.css';

// rax中的1是1/750,100作为空隙
export default ({ children, totalWidth = 600, height = 200, styleMore = [] }) => {
    const width = ~~(totalWidth / children.length);
    styles.col = { width, height };
    return (
        <View style={[styles.row, ...styleMore]}>
            {
                children.map((c, i) => (
                    <View style={styles.col}>
                        { c }
                    </View>
                ))
            }
        </View>
    );
}
