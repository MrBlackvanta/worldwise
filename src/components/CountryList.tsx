import { type CityType } from "../context/CitiesContext";
import { useCities } from "../hooks/useCities.ts";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.scss";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList() {
  const { cities, isLoading } = useCities();
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
