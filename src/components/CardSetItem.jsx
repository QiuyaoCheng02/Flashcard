import { useState } from "react";
import { ROLE } from "../constants";

export default function CardSetItem({
  cardSet,
  role,
  onSelect,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(cardSet.title);

  return (
    <>
      <div className="cardSet__row cardSet__top-row">
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
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(cardSet.id)}>Delete</button>
          </>
        )}
      </div>

      {role === ROLE.ADMIN && (
        <div className="cardSet__row cardSet__middle-row">
          <p className="cardSet__creator">Created by: {cardSet.createdBy}</p>
        </div>
      )}

      <div className="cardSet__row cardSet__bottom-row">
        <button
          className="view-set-btn btn"
          onClick={() => onSelect(cardSet.id)}
        >
          View
        </button>
      </div>
    </>
  );
}
