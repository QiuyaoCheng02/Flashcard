import { useState } from "react";
import { ROLE, CLIENT } from "../constants";
import "./CardSetItem.css";
import editIcon from "../assets/edit.png";
import saveIcon from "../assets/save.png";
import cancelIcon from "../assets/cancel.png";
import deleteIcon from "../assets/delete.png";
import startIcon from "../assets/start.png";

export default function CardSetItem({
  cardSet,
  role,
  onSelect,
  onDelete,
  onEdit,
  onPractice,
  dispatch,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(cardSet.title);

  function handleSave() {
    if (!newTitle.trim()) {
      if (dispatch)
        dispatch({ type: "setError", error: { error: CLIENT.REQUIRED_TITLE } });
      setNewTitle("");
      return;
    }
    onEdit(cardSet.id, newTitle);
    setIsEditing(false);
  }

  return (
    <>
      <>
        {isEditing ? (
          <>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <button onClick={handleSave} className="btn-icon">
              <img src={saveIcon} alt="save" />
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-icon">
              <img src={cancelIcon} alt="cancel" />
            </button>
          </>
        ) : (
          <>
            <div className="edit-btns">
              <button onClick={() => onDelete(cardSet.id)} className="btn-icon">
                <img src={deleteIcon} alt="delete" />
              </button>
              {role !== ROLE.ADMIN && (
                <button
                  onClick={() => onPractice(cardSet.id)}
                  className="btn-icon"
                >
                  <img src={startIcon} alt="Start Practice" />
                </button>
              )}
            </div>

            <div className="set-title">
              <h3>{cardSet.title}</h3>
              <button onClick={() => setIsEditing(true)} className="btn-icon">
                <img src={editIcon} alt="edit" />
              </button>
            </div>
          </>
        )}
      </>

      {role === ROLE.ADMIN && (
        <p className="set-creater">Created by: {cardSet.createdBy}</p>
      )}

      <button className="view-set-btn btn" onClick={() => onSelect(cardSet.id)}>
        View
      </button>
    </>
  );
}
