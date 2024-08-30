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
  return (
    <Panel className={styles.card}>
      <div className={styles.info}>
        <p>{street_address}</p>
        <p>{state}</p>
        <p>{zip}</p>
        <p>{sqft}</p>
        <p>{beds}</p>
        <p>{list_price}</p>
      </div>
      <Button.HighContrast>Edit Users</Button.HighContrast>
    </Panel>
  );
}
