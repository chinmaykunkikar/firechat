import { createContext, useReducer } from "react";

export const UserProfileContext = createContext({});

export function UserProfileContextProvider({ children }: any) {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <UserProfileContext.Provider value={{ isOpen, toggleIsOpen }}>
      {children}
    </UserProfileContext.Provider>
  );
}
