import { useSelector } from "react-redux";
import Button from "../../../../../../components/ui/Button";
import Panel from "../../../../../../components/ui/Panel";
import {
  useFindUsersByHomeQuery,
  useUpdateUsersMutation,
} from "../../../../../../features/apiSlice";
import styles from "./styles.module.css";
import { RootState } from "../../../../../../store";
import { useEffect, useState } from "react";
import Loading from "../../../../../../components/ui/Loading";

interface TProps {
  normal: () => void;
  home_id: number;
  street_address: string;
  refetchHomes: (callback: () => void) => void;
  presence: string;
}

type TCheckboxObject = {
  [key: string]: {
    username: string;
    checked: boolean;
  };
};

function isEqual(obj1: TCheckboxObject, obj2: TCheckboxObject) {
  for (const key in obj1) {
    if (obj1[key].checked !== obj2[key].checked) {
      return false;
    }
  }
  return true;
}

export default function ModalScreen({
  normal,
  home_id,
  street_address,
  refetchHomes,
  presence,
}: TProps) {
  const {
    data: homeUsers,
    isLoading,
    error,
    refetch,
  } = useFindUsersByHomeQuery({ homeId: home_id });

  const [updateUsers, { isLoading: updateLoading }] = useUpdateUsersMutation();

  const allUsers = useSelector((state: RootState) => state.user.users);

  // to make sure user update is idempotent
  const [checkboxList, setCheckboxList] = useState<TCheckboxObject>({});
  const [changedList, setChangedList] = useState<TCheckboxObject>({});

  const [saveTxt, setSaveTxt] = useState<string>("Save");

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    for (const key in changedList) {
      if (changedList[key].username === name) {
        setChangedList({
          ...changedList,
          [key]: {
            username: changedList[key].username,
            checked: checked,
          },
        });
        break;
      }
    }
  };

  const useOnSave = () => {
    const tickedusers: number[] = [];
    for (const key in changedList) {
      if (changedList[key].checked) {
        tickedusers.push(parseInt(key));
      }
    }
    setSaveTxt("Save");
    updateUsers({
      homeId: home_id,
      userIds: tickedusers,
    })
      .unwrap()
      .then(() => {
        refetchHomes(normal);
      })
      .catch((error) => {
        setSaveTxt("Error!");
        console.error(error);
      });
  };

  // Update checkboxList and changedList when homeUsers are fetched
  useEffect(() => {
    if (homeUsers) {
      const newCheckboxList: TCheckboxObject = {};
      for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < homeUsers.length; j++) {
          if (allUsers[i].user_id === homeUsers[j].user_id) {
            newCheckboxList[allUsers[i].user_id] = {
              username: allUsers[i].username,
              checked: true,
            };
            break;
          } else {
            newCheckboxList[allUsers[i].user_id] = {
              username: allUsers[i].username,
              checked: false,
            };
          }
        }
      }

      setCheckboxList(newCheckboxList);
      setChangedList(newCheckboxList);
    }
  }, [allUsers, homeUsers]);

  useEffect(() => {
    refetch();
  }, [presence]);

  return (
    <div className={styles.modalContainer}>
      <Panel className={styles.modal}>
        <h4>Modify Users for: {street_address}</h4>
        {error ? (
          <p>Error fetching data!</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          Object.values(changedList).map((checkbox, key) => (
            <div className={styles.userCheckbox} key={key}>
              <input
                className={styles.checkbox}
                type="checkbox"
                name={checkbox.username}
                checked={checkbox.checked}
                onChange={onCheckboxChange}
              />
              <label htmlFor="user">{checkbox.username}</label>
            </div>
          ))
        )}
        <div className={styles.buttons}>
          <Button.LowContrast onClick={normal}>Cancel</Button.LowContrast>

          {!isEqual(checkboxList, changedList) ? (
            <Button.HighContrast onClick={useOnSave}>
              {updateLoading ? <Loading /> : saveTxt}
            </Button.HighContrast>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}
