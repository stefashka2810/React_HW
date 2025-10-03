import useGenerateApi from "../../../../hooks/useGenerateApi.ts";
import styles from "./GeneratorBlock.module.css";
import Button from "../../../../components/Button/Button.tsx";

const GeneratorBlock = () => {
    const {status,
        downloadUrl,
        filename,
        errorMsg,
        getGeneratedFile} = useGenerateApi();

    return (
        <div className={styles.wrapper}>
            <p className={styles.description}>
                Сгенерируйте готовый csv-файл нажатием одной кнопки
            </p>

            {status === "begin" && (
                <Button isActive onClick={getGeneratedFile}>Начать генерацию</Button>
            )}

            {status === "loading" && (
                <div className={styles.fileBlock}>
                    <div className={styles.spinner}></div>
                    <p>идёт процесс генерации</p>
                </div>
            )}

            {status === "error" && (
                <div className={styles.fileBlock}>
                    <p>упс, не то... {errorMsg && <span>({errorMsg})</span>}</p>
                    <Button isActive onClick={getGeneratedFile}>Повторить</Button>
                </div>
            )}

            {status === "success" && downloadUrl && (
                <div className={styles.fileBlock}>
                    <span>Готово!</span>
                    <a href={downloadUrl} download={filename}>Скачать {filename}</a>
                    <Button isActive onClick={getGeneratedFile}>Сгенерировать снова</Button>
                </div>
            )}
        </div>
    );
}

export default GeneratorBlock;