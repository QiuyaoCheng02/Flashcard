// AddCardSetForm.jsx
import { useState } from "react";
import saveIcon from "../assets/save.png";
import cancelIcon from "../assets/cancel.png";

export default function AddCardSetForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title) {
      const trimmedTitle = title.trim();
      onSubmit(trimmedTitle);
      return;
    }
    setTitle("");
  }

  return (
    <form className="add-cardset-form" onSubmit={handleSubmit}>
      <label htmlFor="title-input">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title-input"
        />
      </label>
      <button type="submit" className="btn-icon">
        <img src={saveIcon} alt="save" />
      </button>
      <button type="button" onClick={onCancel} className="btn-icon">
        <img src={cancelIcon} alt="cancel" />
      </button>
    </form>
  );
}
