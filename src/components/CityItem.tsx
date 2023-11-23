import { Link } from "react-router-dom";
import { type CityType } from "../context/CitiesContext";
import { formatDate } from "../utils";
import styles from "./CityItem.module.scss";
import { useCities } from "../hooks/useCities";

type CityItemProps = {
  city: CityType;
};

export default function CityItem({ city }: CityItemProps) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={`${styles["city-item"]} ${
          currentCity.id === id ? styles["city-item--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles["emoji"]}>{emoji}</span>
        <h3 className={styles["name"]}>{cityName}</h3>
        <time className={styles["date"]}>({formatDate(date)})</time>

        <button className={styles["delete-btn"]}>&times;</button>
      </Link>
    </li>
  );
}
