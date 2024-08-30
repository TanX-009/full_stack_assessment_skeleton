import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Panel from "../../../../components/ui/Panel";
import styles from "./styles.module.css";

interface TProps {
  street_address: string;
  state: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
}

export default function Card({
  street_address,
  state,
  zip,
  sqft,
  beds,
  list_price,
}: TProps) {
  const [presence, setPresence] = useState<string>("normal");
  const present = () => setPresence("present");
  const normal = () => setPresence("normal");

  return (
    <div className={styles.cardContainer}>
      {presence === "normal" ? (
        <Panel className={styles.card}>
          <div className={styles.info}>
            <h4>{street_address}</h4>
            <p>{state}</p>
            <p>{zip}</p>
            <p>{sqft}</p>
            <p>{beds}</p>
            <p>{list_price}</p>
          </div>
          <Button.HighContrast onClick={present}>
            Edit Users
          </Button.HighContrast>
        </Panel>
      ) : (
        <div className={styles.modalContainer}>
          <Panel className={styles.modal}>
            <h4>Modify Users for: {street_address}</h4>
            <div>
              <input type="checkbox" name="user" />
              <label htmlFor="user">User</label>
            </div>
            <div className={styles.buttons}>
              <Button.LowContrast onClick={normal}>Cancel</Button.LowContrast>
              <Button.HighContrast onClick={normal}>Save</Button.HighContrast>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
