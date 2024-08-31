import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/ui/Button";
import styles from "./styles.module.css";
import { RootState } from "../../../../store";
import { ChangeEvent, useEffect } from "react";
import { useFindAllUsersQuery } from "../../../../features/apiSlice";
import Home from "../../../../types/home.type";

interface TProps {
  page: number;
  setPage: (page: number) => void;
  homes: Home[] | undefined;
}

export default function Navbar({ page, setPage, homes }: TProps) {
  const dispatch = useDispatch();
  const { data: users, isLoading, error } = useFindAllUsersQuery();
  const userList = useSelector((state: RootState) => state.user.users);

  const handleSelectUser = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = e.target.value;
    let payload = selectedUser;
    if (selectedUser === "none") payload = "-1";
    dispatch({ type: "user/setCurrentUser", payload: payload });
    // reset page to 1 after selecting a new user
    setPage(1);
  };

  const handleNextPage = () => {
    if (homes && homes.length === 50) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (users) {
      dispatch({ type: "user/setUsers", payload: users });
    }
  }, [users, dispatch]);

  return (
    <div className={styles.navbar}>
      <div className={styles.userSelector}>
        {error ? (
          <p>Error fetching users!</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <label htmlFor="select_user">Select user:</label>
            <select
              name="select_user"
              onChange={handleSelectUser}
              defaultValue={"none"}
            >
              <option value="none">None</option>
              {userList?.map((user, key) => (
                <option key={key} value={user.user_id}>
                  {user.username}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className={styles.pages}>
        <Button.LowContrast onClick={handlePrevPage}>
          {"Prev"}
        </Button.LowContrast>
        {page}
        <Button.LowContrast onClick={handleNextPage}>
          {"Next"}
        </Button.LowContrast>
      </div>
    </div>
  );
}
