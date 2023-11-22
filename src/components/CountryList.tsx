import { type CityType } from "../App";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.scss";
import Message from "./Message";
import Spinner from "./Spinner";

type CountryListProps = {
  cities: CityType[];
  isLoading: boolean;
};

export default function CountryList({ cities, isLoading }: CountryListProps) {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cities.reduce(
    (arr: { country: string; emoji: string }[], city: CityType) => {
      const existingCountry = arr.find((el) => el.country === city.country);

      if (!existingCountry) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },
    []
  );

  return (
    <ul className={styles["country-list"]}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
