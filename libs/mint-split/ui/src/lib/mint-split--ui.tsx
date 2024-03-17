import styles from './mint-split--ui.module.css';

/* eslint-disable-next-line */
export interface MintSplitUiProps {}

export function MintSplitUi(props: MintSplitUiProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to MintSplitUi!</h1>
        </div>
    );
}

export default MintSplitUi;
