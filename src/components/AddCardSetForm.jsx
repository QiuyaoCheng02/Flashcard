// AddCardSetForm.jsx
import { useState } from "react";

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
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}
