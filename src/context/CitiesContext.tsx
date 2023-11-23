import { ReactNode, createContext, useState, useEffect } from "react";

const BASE_URL = `http://localhost:8000`;

export type CityType = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
};

export type CurrentCityType = {
  cityName: string;
  emoji: string;
  date: string;
  notes: string;
  id: number;
};

export type CitiesContextProps = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CurrentCityType;
  getCity: (id: number) => Promise<void>;
};

export const CitiesContext = createContext<CitiesContextProps | undefined>(
  undefined
);

type CitiesProviderProps = {
  children: ReactNode;
};

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentCity, setCurrentCity] = useState<CurrentCityType>({
    cityName: "",
    emoji: "",
    date: "",
    notes: "",
    id: -1,
  });

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("There was an error loading data...", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("There was an error loading data...", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
