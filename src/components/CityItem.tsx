import { type City } from "../App";
import styles from "./CityItem.module.scss";

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
}

type CityItemProps = {
  city: City;
};

export default function CityItem({ city }: CityItemProps) {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles["city-item"]}>
      <span className={styles["emoji"]}>{emoji}</span>
      <h3 className={styles["name"]}>{cityName}</h3>
      <time className={styles["date"]}>({formatDate(date)})</time>

      <button className={styles["delete-btn"]}>&times;</button>
    </li>
  );
}
