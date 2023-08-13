import { useNotifictaionValue } from "../context/notificationContext";
const Notification = () => {
  const notification = useNotifictaionValue();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!notification.display) {
    return null;
  }
  return <div style={style}>{notification.value}</div>;
};

export default Notification;
