import { useState } from "react";

export default function CardSetItem({ cardSet, onSelect, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(cardSet.title);

  return (
    <>
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            onClick={() => {
              onEdit(cardSet.id, newTitle);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{cardSet.title}</span>
          <button
            className="view-set-btn btn"
            onClick={() => onSelect(cardSet.id)}
          >
            View
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(cardSet.id)}>Delete</button>
        </>
      )}
    </>
  );
}
