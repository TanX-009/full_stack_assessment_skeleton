import Card from "./components/Card";
import Navbar from "./components/Navbar";
import styles from "./styles.module.css";

export default function Home() {
  const homes = () => {
    return [
      {
        street_address:
          "123 Main St asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff asdf asdf asf asdf asdf asdf asdf asdf asf sa fas fasdf sadf asd fasdadsf as ddsa fsa",
        state: "CA asdf asf as f",
        zip: "12345",
        sqft: 1000,
        beds: 2,
        baths: 2,
        list_price: 100000,
      },
      {
        street_address: "456 Elm St",
        state: "CA",
        zip: "12345",
        sqft: 1500,
        beds: 3,
        baths: 2,
        list_price: 150000,
      },
      {
        street_address: "789 Oak St",
        state: "CA",
        zip: "12345",
        sqft: 2000,
        beds: 4,
        baths: 3,
        list_price: 200000,
      },
      {
        street_address:
          "123 Main St asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff asdf asdf asf asdf asdf asdf asdf asdf asf sa fas fasdf sadf asd fasdadsf as ddsa fsa",
        state: "CA asdf asf as f",
        zip: "12345",
        sqft: 1000,
        beds: 2,
        baths: 2,
        list_price: 100000,
      },
      {
        street_address: "456 Elm St",
        state: "CA",
        zip: "12345",
        sqft: 1500,
        beds: 3,
        baths: 2,
        list_price: 150000,
      },
      {
        street_address: "789 Oak St",
        state: "CA",
        zip: "12345",
        sqft: 2000,
        beds: 4,
        baths: 3,
        list_price: 200000,
      },
      {
        street_address:
          "123 Main St asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff asdf asdf asf asdf asdf asdf asdf asdf asf sa fas fasdf sadf asd fasdadsf as ddsa fsa",
        state: "CA asdf asf as f",
        zip: "12345",
        sqft: 1000,
        beds: 2,
        baths: 2,
        list_price: 100000,
      },
      {
        street_address: "456 Elm St",
        state: "CA",
        zip: "12345",
        sqft: 1500,
        beds: 3,
        baths: 2,
        list_price: 150000,
      },
      {
        street_address: "789 Oak St",
        state: "CA",
        zip: "12345",
        sqft: 2000,
        beds: 4,
        baths: 3,
        list_price: 200000,
      },
      {
        street_address:
          "123 Main St asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff asdf asdf asf asdf asdf asdf asdf asdf asf sa fas fasdf sadf asd fasdadsf as ddsa fsa",
        state: "CA asdf asf as f",
        zip: "12345",
        sqft: 1000,
        beds: 2,
        baths: 2,
        list_price: 100000,
      },
      {
        street_address: "456 Elm St",
        state: "CA",
        zip: "12345",
        sqft: 1500,
        beds: 3,
        baths: 2,
        list_price: 150000,
      },
      {
        street_address: "789 Oak St",
        state: "CA",
        zip: "12345",
        sqft: 2000,
        beds: 4,
        baths: 3,
        list_price: 200000,
      },
    ];
  };
  return (
    <>
      <Navbar />
      <div className={styles.homes}>
        {homes().map((home, key) => (
          <Card key={key} {...home} />
        ))}
      </div>
    </>
  );
}
