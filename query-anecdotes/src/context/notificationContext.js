import { createContext, useReducer, useContext } from "react";
const NotificationContext = createContext(undefined);

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return { ...state, value: action.payload };
    case "DISPLAY":
      return { ...state, display: true };
    case "HIDE":
      return { ...state, display: false };
    default:
      return state;
  }
};
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    display: false,
    value: "",
  });
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotifictaionValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotifictaionDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
export const useFlashNotification = (msg, time = 5) => {
  const notificationAndDispatch = useContext(NotificationContext);
  const notificationDispatch = notificationAndDispatch[1];
  notificationDispatch({
    type: "CHANGE_VALUE",
    payload: msg,
  });
  notificationDispatch({
    type: "DISPLAY",
  });
  setTimeout(() => {
    notificationDispatch({
      type: "HIDE",
    });
  }, time * 1000);
};
export default NotificationContext;
