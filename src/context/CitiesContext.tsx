import { ReactNode, createContext, useReducer, useEffect } from "react";

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

type NewCityParam = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: { lat: string | null; lng: string | null };
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
  error: string;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: NewCityParam) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

export const CitiesContext = createContext<CitiesContextProps | undefined>(
  undefined
);

type CitiesProviderProps = {
  children: ReactNode;
};

type ActionType =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] }
  | { type: "city/loaded"; payload: CityType }
  | { type: "city/created"; payload: CityType }
  | { type: "cities/deleted"; payload: number }
  | { type: "rejected"; payload: string };

const initialState: CitiesContextProps = {
  cities: [],
  isLoading: true,
  currentCity: { cityName: "", emoji: "", date: "", notes: "", id: -1 },
  error: "",
  getCity: async () => {}, // Add this line
  createCity: async () => {}, // Add this line
  deleteCity: async () => {},
};

function reducer(state: CitiesContextProps, action: ActionType) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((el) => el.id !== action.payload),
        currentCity: { cityName: "", emoji: "", date: "", notes: "", id: -1 },
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities...",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: number) {
    if (id === currentCity.id) {
      return;
    }
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  async function createCity(newCity: NewCityParam) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      ("cities/created");
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
