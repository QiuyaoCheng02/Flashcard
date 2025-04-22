import { MESSAGES } from "../constants";

export default function Notice({ message }) {
  const text = MESSAGES[message] || "";
  return <div className="notice">{message && text}</div>;
}
