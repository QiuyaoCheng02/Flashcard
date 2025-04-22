import { useState } from "react";
import "./FlashCard.css";

export default function FlashCard({ card, index, total, onAnswer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flashcard">
      <h3>
        Card {index + 1} / {total}
      </h3>
      <div
        className={`card-box${isFlipped ? " flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-inner">
          <div className="card-face front">
            <p>
              <strong>Q:</strong> {card.question}
            </p>
            <small>(Click to flip)</small>
          </div>
          <div className="card-face back">
            <p>
              <strong>A:</strong> {card.answer}
            </p>
            <small>(Click to flip)</small>
          </div>
        </div>
      </div>
      <div className="controls">
        <button className="btn" onClick={() => onAnswer(true)}>
          ✔ I got it right
        </button>
        <button className="btn" onClick={() => onAnswer(false)}>
          ✘ I got it wrong
        </button>
      </div>
    </div>
  );
}
