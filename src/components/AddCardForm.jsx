// AddCardSetForm.jsx
import { useState } from "react";
import "./CardItem.css";
import saveIcon from "../assets/save.png";
import cancelIcon from "../assets/cancel.png";

export default function AddCardForm({ onSubmit, onCancel }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (question && answer) {
      onSubmit(question.trim(), answer.trim());
      return;
    }
    setQuestion("");
    setAnswer("");
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <label htmlFor="question-input">
        Q:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          id="question-input"
        />
      </label>
      <label htmlFor="answer-input">
        A:
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          id="answer-input"
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
