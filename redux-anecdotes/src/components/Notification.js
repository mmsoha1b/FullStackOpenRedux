import { useSelector } from "react-redux";
const Notification = () => {
  const [notification, display] = useSelector((state) => [
    state.notification.content,
    state.notification.display,
  ]);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return display ? <div style={style}>{notification}</div> : null;
};

export default Notification;
