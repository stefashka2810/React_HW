import useLocalStorage from "../../../../hooks/useLocalStorage.ts";
import styles from "./HistoryBlock.module.css";

const HistoryBlock = () => {
    const {storageData, deleteFromLocalStorage} =  useLocalStorage();

    return (
        <div className={styles.wrapper}>
            <p>История сгенерированных файлов</p>

            {storageData.length === 0 && (
                <div className={styles.empty}>
                    История пуста...
                </div>
            )}

            {storageData.length > 0 && (
                <div className={styles.list}>
                    {storageData.map((item) => (
                        <div key={item[0]} className={styles.item}>
                            <a
                                className={styles.href}
                                href={item[1]}
                                download={item[0]}
                            >
                                {item[0]}
                            </a>
                            <button
                                className={styles.btnDelete}
                                onClick={() => deleteFromLocalStorage(item[0])}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default HistoryBlock;