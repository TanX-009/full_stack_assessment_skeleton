import { useState } from "react";
import Button from "../../../../components/ui/Button";
import Panel from "../../../../components/ui/Panel";
import styles from "./styles.module.css";
import Home from "../../../../types/home.type";
import ModalScreen from "./components/ModalScreen";

interface TProps extends Home {
  refetchHomes: (callback: () => void) => void;
}

export default function Card({
  refetchHomes,
  home_id,
  street_address,
  state,
  zip,
  sqft,
  beds,
  baths,
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
            <p>List price: ${list_price}</p>
            <p>State: {state.state_name}</p>
            <p>Zip: {zip}</p>
            <p>Sqft: {sqft}</p>
            <p>Beds: {beds}</p>
            <p>Baths: {baths}</p>
          </div>
          <Button.HighContrast onClick={present}>
            Edit Users
          </Button.HighContrast>
        </Panel>
      ) : (
        <ModalScreen
          normal={normal}
          home_id={home_id}
          street_address={street_address}
          refetchHomes={refetchHomes}
          presence={presence}
        />
      )}
    </div>
  );
}
