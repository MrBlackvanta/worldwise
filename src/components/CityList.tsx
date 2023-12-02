import { useCities } from "../hooks/useCities.ts";
import CityItem from "./CityItem";
import styles from "./CityList.module.scss";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles["city-list"]}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
