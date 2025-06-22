import { useGeneratorStore } from "../store/generatorStore";
import styles from "../features/upload/UploadForm.module.css";
import RemoveIcon from "../assets/RemoveIcon.svg?react";

const GeneratorPage = () => {
  const { status, generate, reset } = useGeneratorStore();

  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>

      {status === "idle" && (
        <button className={styles.submitBtn} onClick={generate}>
          Начать генерацию
        </button>
      )}

      {status === "loading" && (
        <div>
          <div className={styles.spinner}></div>
          <p>идёт процесс генерации</p>
        </div>
      )}

      {status === "done" && (
        <div className={styles.fileRow}>
          <div
            className={styles.fileBlock}
            style={{ backgroundColor: "#9DFFBD" }}
          >
            <span>Done!</span>
            <button onClick={reset} className={styles.removeBtn}>
              <RemoveIcon />
            </button>
          </div>
          <p>Файл сгенерирован!</p>
        </div>
      )}

      {status === "error" && (
        <div className={styles.fileRow}>
          <div
            className={styles.fileBlock}
            style={{ backgroundColor: "#FF5F00" }}
          >
            <span>Ошибка</span>
            <button onClick={reset} className={styles.removeBtn}>
              <RemoveIcon />
            </button>
          </div>
          <p>упс, не то...</p>
        </div>
      )}
    </div>
  );
};

export default GeneratorPage;
