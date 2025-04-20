import { useState } from "react";

export default function FlashCard({ card, index, total, onAnswer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flashcard">
      <h3>
        Card {index + 1} / {total}
      </h3>
      <div className="card-box" onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? (
          <p>
            <strong>A:</strong> {card.answer}
          </p>
        ) : (
          <p>
            <strong>Q:</strong> {card.question}
          </p>
        )}
        <small>(Click to flip)</small>
      </div>
      <div className="controls">
        <button onClick={() => onAnswer(true)}>✔ I got it right</button>
        <button onClick={() => onAnswer(false)}>✘ I got it wrong</button>
      </div>
    </div>
  );
}
