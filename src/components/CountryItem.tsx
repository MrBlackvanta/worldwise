import styles from "./CountryItem.module.scss";

type CountryItemProps = {
  country: { country: string; emoji: string };
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
