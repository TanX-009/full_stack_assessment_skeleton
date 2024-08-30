import Button from "../../../../components/ui/Button";
import styles from "./styles.module.css";

export default function Navbar() {
  const users = () => {
    return ["User 1", "User 2", "User 3"];
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.userSelector}>
        <label htmlFor="select_user">Select user:</label>
        <select name="select_user">
          {users().map((user, key) => (
            <option key={key} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.pages}>
        <Button.LowContrast>{"<<"}</Button.LowContrast>
        <Button.LowContrast>{"<"}</Button.LowContrast>
        {1}
        <Button.LowContrast>{">"}</Button.LowContrast>
        <Button.LowContrast>{">>"}</Button.LowContrast>
      </div>
    </div>
  );
}
