import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.scss";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles["map-container"]} onClick={() => navigate("form")}>
      <h1 onClick={() => setSearchParams({ lat: "23", lng: "50" })}>Map</h1>
      <h2>
        Position: {lat},{lng}
      </h2>
    </div>
  );
}
