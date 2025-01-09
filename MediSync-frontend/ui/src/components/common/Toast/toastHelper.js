import constants from "../../../constants";
import {
  faCheckCircle,
  faCircleInfo,
  faExclamationCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Toast } from "./Toast";

export const callToast = (message, type) => {
  let icon = null;
  let color = "#59B12F";
  switch (type) {
    case constants.ERROR_TOAST:
      color = "#C64141";
      icon = faExclamationTriangle;
      return toast(
        (t) => (
          <Toast
            message={message}
            color={color}
            icon={icon}
            myToast={t}
            type={type}
          />
        ),
        {
          duration: "100000",
        },
      );

    case constants.WARNING_TOAST:
      color = "#FFB84D";
      icon = faExclamationCircle;
      return toast(
        (t) => (
          <Toast
            message={message}
            color={color}
            icon={icon}
            myToast={t}
            type={type}
          />
        ),
        {
          duration: "100000",
        },
      );

    case constants.INFO_TOAST:
      color = "#0E89E2";
      icon = faCircleInfo;
      return toast((t) => (
        <Toast
          message={message}
          color={color}
          icon={icon}
          myToast={t}
          type={type}
        />
      ));

    default:
      color = "#59B12F";
      icon = faCheckCircle;
      return toast((t) => (
        <Toast
          message={message}
          color={color}
          icon={icon}
          myToast={t}
          type={type}
        />
      ));
  }
};
