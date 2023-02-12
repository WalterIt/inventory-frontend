import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

export default function Search({ value, onChange }) {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search product"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
