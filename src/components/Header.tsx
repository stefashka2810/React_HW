import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.svg?react";
import UploadIcon from "../assets/mage_upload.svg?react";
import GeneratorIcon from "../assets/oui_ml-create-multi-metric-job.svg?react";
import HistoryIcon from "../assets/solar_history-linear.svg?react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <UploadIcon className={styles.icon} />
          CSV Аналитик
        </NavLink>
        <NavLink
          to="/generate"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <GeneratorIcon className={styles.icon} />
          CSV Генератор
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <HistoryIcon className={styles.icon} />
          История
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
