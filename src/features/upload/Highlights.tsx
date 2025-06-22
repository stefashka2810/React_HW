import styles from "./UploadForm.module.css";
import type { UploadResult } from "../../store/uploadStore";

interface HighlightsProps {
  result: UploadResult;
}

const Highlights = ({ result }: HighlightsProps) => {
  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.analyticsCard}>
        <strong>{result.total_spend_galactic}</strong>
        <span>общие расходы в галактических кредитах</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.less_spent_civ}</strong>
        <span>цивилизация с минимальными расходами</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.rows_affected}</strong>
        <span>количество обработанных записей</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.big_spent_date}</strong>
        <span>день года с максимальными расходами</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.less_spent_date}</strong>
        <span>день года с минимальными расходами</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.big_spent_value}</strong>
        <span>максимальная сумма расходов за день</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.big_spent_civ}</strong>
        <span>цивилизация с максимальными расходами</span>
      </div>
      <div className={styles.analyticsCard}>
        <strong>{result.average_spend_galactic}</strong>
        <span>средние расходы в галактических кредитах</span>
      </div>
    </div>
  );
};

export default Highlights;
