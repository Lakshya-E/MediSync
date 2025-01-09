import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Toast.scss";
import toast from "react-hot-toast";
import constants from "../../../constants";

const CreateMessage = (props) => {
  const message = props.message;
  return (
    <div className="message">
      <div className="tittle">{message.tittle}</div>
      <div className="description">{message.description}</div>
    </div>
  );
};

const CreateIcon = (props) => {
  const color = props.color;
  const icon = props.icon;
  return (
    <div className="icon-div">
      <div className="vertical-div" style={{ background: color }}>
        &nbsp;
      </div>
      <FontAwesomeIcon size="lg" color={color} icon={icon} />
    </div>
  );
};
export const Toast = (props) => {
  const { message, myToast, color, icon, type } = props;
  return (
    <div
      className="toast"
      onClick={() => {
        type === constants.ERROR_TOAST || type === constants.WARNING_TOAST
          ? toast.dismiss(myToast.id)
          : null;
      }}
    >
      <CreateIcon color={color} icon={icon} />
      <CreateMessage message={message} />
      <FontAwesomeIcon
        size="xl"
        color="#565656"
        icon={faXmark}
        onClick={() => toast.dismiss(myToast.id)}
      />
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  myToast: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
