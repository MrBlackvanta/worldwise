import { useState } from "react";

export default function useGeolocation(defaultPosition: {
  lat: number;
  lng: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    defaultPosition
  );
  const [error, setError] = useState<string>();

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
