import { useState } from "react";
import { useUploadStore } from "../../../../hooks/uploadStore.ts";
import RemoveIcon from "../../../../assets/RemoveIcon.svg?react";
import Highlights from "../Highlights/Highlights.tsx";
import styles from "./UploadForm.module.css";
import type { UploadResult } from "../../../../hooks/uploadStore.ts";
import Button from "../../../../components/Button/Button.tsx";

const UploadForm = () => {
  const { file, setFile, status, upload, result, clear, invalidType } =
    useUploadStore();

  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>
        Загрузите <strong>csv</strong> файл и получите{" "}
        <strong>полную информацию</strong> о нём за сверхнизкое время
      </p>

      <div
        className={`${styles.box} 
        ${isDragActive ? styles.dragActive : ""} 
        ${invalidType ? styles.invalidFile : ""} 
        ${file && !invalidType ? styles.rightFile : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
      >
        {!file && (
          <>
            <label className={styles.uploadBtn}>
              Загрузить файл
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                hidden
              />
            </label>
            <p className={styles.dropText}>или перетащите сюда</p>
          </>
        )}

        {file && status !== "loading" && (
          <div className={styles.fileRow}>
            <div
              className={styles.fileBlock}
              style={{ backgroundColor: invalidType ? "#FF5F00" : "#CB81FF" }}
            >
              <span className={styles.fileName}>{file.name}</span>
            </div>
            <button onClick={clear} className={styles.removeBtn}>
              <RemoveIcon />
            </button>
          </div>
        )}

        {file && status === "loading" && (
          <div className={styles.fileRow}>
            <div
              className={styles.fileBlock}
              style={{ backgroundColor: "#CB81FF" }}
            >
              <div className={styles.parsingWrap}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          </div>
        )}

        {invalidType && <p className={styles.errorMsg}>упс, не то...</p>}

        {file && !invalidType && status !== "loading" && <p>файл загружен!</p>}

        {file && status === "loading" && <p>идет парсинг файла</p>}
      </div>

      {status !== "loading" && (
          <div>
            <Button
                isActive={!!file && !invalidType}
                onClick={file && !invalidType ? upload : undefined}
            >
              Отправить
            </Button>
          </div>
      )}

      {status === "success" && result && typeof result === "object" && (
        <Highlights result={result as UploadResult} />
      )}

      {!result && (
        <div className={styles.placeholder}>
          Здесь
          <br />
          появятся хайлайты
        </div>
      )}
    </div>
  );
};

export default UploadForm;
