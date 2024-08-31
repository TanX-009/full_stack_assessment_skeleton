import { useState } from "react";
import { useFindHomesByUserQuery } from "../../features/apiSlice";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loading from "../../components/ui/Loading";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    data: homes,
    isLoading,
    error,
    refetch,
  } = useFindHomesByUserQuery({
    userId: currentUser,
    page: page,
  });

  // refetch homes after updating in the modal
  const refetchHomes = (callback: () => void) => {
    refetch().then(() => {
      callback();
    });
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} homes={homes} />
      {error ? (
        <p>Error fetching data!</p>
      ) : isLoading ? (
        <div className={styles.loader}>
          <Loading />
        </div>
      ) : (
        <div className={styles.homes}>
          {currentUser.toString() !== "-1" ? (
            homes?.map((home, key) => (
              <Card key={key} refetchHomes={refetchHomes} {...home} />
            ))
          ) : (
            <p>Please select a user.</p>
          )}
        </div>
      )}
    </>
  );
}
