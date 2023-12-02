import { useContext } from "react";
import { CitiesContext, CitiesContextProps } from "../context/CitiesContext";

export function useCities(): CitiesContextProps {
  const citiesContext = useContext(CitiesContext);

  if (!citiesContext) {
    throw new Error("useCities must be used within a CitiesContextProvider");
  }

  return citiesContext;
}
