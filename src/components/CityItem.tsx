import { Link } from "react-router-dom";
import { type CityType } from "../context/CitiesContext";
import { formatDate } from "../utils";
import styles from "./CityItem.module.scss";
import { useCities } from "../hooks/useCities.ts";

type CityItemProps = {
  city: CityType;
};

export default function CityItem({ city }: CityItemProps) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCity(id);
  }

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

        <button className={styles["delete-btn"]} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
