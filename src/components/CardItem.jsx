import { useState } from "react";

export default function CardItem({ card, onEdit, onDelete, setId }) {
  const [isEditingQ, setIsEditingQ] = useState(false);
  const [isEditingA, setIsEditingA] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(card.question);
  const [editedAnswer, setEditedAnswer] = useState(card.answer);
  function handleSave() {
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
      <div>
        <strong>Q:</strong>{" "}
        {isEditingQ ? (
          <>
            <input
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() => {
                setIsEditingQ(false);
                setEditedQuestion(card.question);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {card.question}
            <button
              onClick={() => {
                setIsEditingQ(true);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>

      <div>
        <strong>A:</strong>{" "}
        {isEditingA ? (
          <>
            <input
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button
              onClick={() => {
                setIsEditingA(false);
                setEditedAnswer(card.answer);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {card.answer}
            <button
              onClick={() => {
                setIsEditingA(true);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>

      <button onClick={() => onDelete(setId, card.id)}>Delete</button>
    </>
  );
}
