import styles from './Button.module.css';
import * as React from "react";

function Button({ children, isActive, onClick }: { children: React.ReactNode,  isActive: boolean, onClick:  undefined |
        (() => void) | (() => Promise<void>)}) {
    if (isActive) {
        return (<button onClick={onClick} className={styles.buttonAble}>
            {children}
        </button>)
    } else {
        return (<button onClick={undefined} className={styles.buttonDisable}>
            {children}
        </button>)
    }

}

export default Button;
