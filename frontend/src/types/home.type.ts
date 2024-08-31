import State from "./state.type";

export default interface Home {
  home_id: number;
  state: State;
  street_address: string;
  zip: string;
  sqft: number;
  beds: number;
  baths: number;
  list_price: number;
}
