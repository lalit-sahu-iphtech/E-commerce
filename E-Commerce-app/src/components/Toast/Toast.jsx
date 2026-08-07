import "./toast.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function Toast({
  message,
  type,
  onClose,
}) {
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
        onClick={onClose}
      />
    </div>
  );
}