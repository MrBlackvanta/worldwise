import { ReactNode, createContext, useReducer } from "react";

type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type AuthContextProps = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type ActionType = { type: "login"; payload: User } | { type: "logout" };

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const initialState: AuthContextProps = {
  user: {
    name: "",
    email: "",
    password: "",
    avatar: "",
  },
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

function reducer(state: AuthContextProps, action: ActionType) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return {
        ...state,
        user: {
          name: "",
          email: "",
          password: "",
          avatar: "",
        },
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
