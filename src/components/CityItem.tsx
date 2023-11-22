import { Link } from "react-router-dom";
import { type CityType } from "../App";
import { formatDate } from "../utils";
import styles from "./CityItem.module.scss";

type CityItemProps = {
  city: CityType;
};

export default function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link
        className={styles["city-item"]}
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
