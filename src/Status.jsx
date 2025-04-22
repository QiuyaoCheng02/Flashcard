import { MESSAGES } from "./constants";

function Status({ error }) {
  const message =
    MESSAGES[typeof error === "string" ? error : error?.error] ||
    error?.message ||
    MESSAGES.default;

  return <div className="status">{message}</div>;
}
export default Status;
