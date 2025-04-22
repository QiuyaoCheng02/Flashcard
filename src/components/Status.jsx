import { MESSAGES } from "../constants";
function Status({ error }) {
  const code = typeof error === "string" ? error : error?.error;

  if (code === "auth-missing") {
    return null;
  }

  const message = MESSAGES[code] || error?.message || MESSAGES.default;
  return <div className="status">{message}</div>;
}
export default Status;
