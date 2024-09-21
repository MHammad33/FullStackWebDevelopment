import { createContext, useReducer, useContext, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BLOG":
      return `Blog "${action.payload.content}" Added`;
    case "FETCHED_ALL_BLOGS":
      return `All Blogs Fetched Successfully`;
    case "ERROR":
      return action.payload;
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
