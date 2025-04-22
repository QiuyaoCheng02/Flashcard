import { useState } from "react";
import { CLIENT } from "../constants";
import "./CardItem.css";
import editIcon from "../assets/edit.png";
import saveIcon from "../assets/save.png";
import cancelIcon from "../assets/cancel.png";
import deleteIcon from "../assets/delete.png";

export default function CardItem({ card, onEdit, onDelete, setId, dispatch }) {
  const [isEditingQ, setIsEditingQ] = useState(false);
  const [isEditingA, setIsEditingA] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(card.question);
  const [editedAnswer, setEditedAnswer] = useState(card.answer);
  function handleSave() {
    if (isEditingQ && !editedQuestion.trim()) {
      if (dispatch)
        dispatch({
          type: "setError",
          error: { error: CLIENT.REQUIRED_QUESTION },
        });
      setEditedQuestion("");
      return;
    }
    if (isEditingA && !editedAnswer.trim()) {
      if (dispatch)
        dispatch({
          type: "setError",
          error: { error: CLIENT.REQUIRED_ANSWER },
        });
      setEditedAnswer("");
      return;
    }
    const updates = {};
    if (isEditingQ && editedQuestion !== card.question) {
      updates.question = editedQuestion;
    }
    if (isEditingA && editedAnswer !== card.answer) {
      updates.answer = editedAnswer;
    }

    if (Object.keys(updates).length > 0) {
      onEdit(card.id, updates);
    }

    setIsEditingQ(false);
    setIsEditingA(false);
  }
  return (
    <>
      <div className="edit-btns">
        <button onClick={() => onDelete(setId, card.id)} className="btn-icon">
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
      <div className="card-info">
        <strong>Q:</strong>{" "}
        {isEditingQ ? (
          <>
            <input
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
            <div className="edit-buttons">
              <button onClick={handleSave} className="btn-icon">
                <img src={saveIcon} alt="save" />
              </button>
              <button
                className="btn-icon"
                onClick={() => {
                  setIsEditingQ(false);
                  setEditedQuestion(card.question);
                }}
              >
                <img src={cancelIcon} alt="cancel" />
              </button>
            </div>
          </>
        ) : (
          <>
            {card.question}
            <button
              className="btn-icon"
              onClick={() => {
                setIsEditingQ(true);
              }}
            >
              <img src={editIcon} alt="edit" />
            </button>
          </>
        )}
      </div>

      <div className="card-info">
        <strong>A:</strong>{" "}
        {isEditingA ? (
          <>
            <input
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
            <button className="btn-icon" onClick={handleSave}>
              <img src={saveIcon} alt="save" />
            </button>
            <button
              onClick={() => {
                setIsEditingA(false);
                setEditedAnswer(card.answer);
              }}
              className="btn-icon"
            >
              <img src={cancelIcon} alt="cancel" />
            </button>
          </>
        ) : (
          <>
            {card.answer}
            <button
              onClick={() => {
                setIsEditingA(true);
              }}
              className="btn-icon"
            >
              <img src={editIcon} alt="edit" />
            </button>
          </>
        )}
      </div>

      <div className="card-info accuracy">
        <small>
          Accuracy:{" "}
          {card.stats?.timesAttempted
            ? `${Math.round(
                ((card.stats.timesAttempted - card.stats.timesWrong) /
                  card.stats.timesAttempted) *
                  100
              )}%`
            : "—"}
        </small>
      </div>
    </>
  );
}
