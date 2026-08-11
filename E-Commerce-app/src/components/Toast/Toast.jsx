import "./toast.css";

import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux/slices/toastSlice";

export default function Toast() {
  const dispatch = useDispatch();

  const { message, type, visible } = useSelector(
    (state) => state.toast
  );

  if (!visible || !message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>
      {type === "success" ? (
        <FaCheckCircle />
      ) : (
        <MdError />
      )}

      <span>{message}</span>

      <IoClose
        className="toast-close"
        onClick={() => dispatch(hideToast())}
      />
    </div>
  );
}