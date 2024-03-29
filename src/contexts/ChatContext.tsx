import { AuthContext } from "@contexts/AuthContext";
import { createContext, useContext, useReducer } from "react";

export const ChatContext = createContext({});

export function ChatContextProvider({ children }: any) {
  const { currentUser }: any = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "USER_SIGNOUT":
        return INITIAL_STATE;
      case "CHAT_DELETE":
        return INITIAL_STATE;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
