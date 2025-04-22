import { useState } from "react";
import FlashCard from "../components/FlashCard";
import { fetchUpdateStats } from "../services/cardServices";

export default function PracticePage({ cards, onExitPractice }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const total = cards.length;

  function handleAnswer(correct) {
    const currentCard = cards[currentIndex];

    fetchUpdateStats(currentCard.id, { wasCorrect: correct });

    if (correct) {
      setCorrectCount((count) => count + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setDone(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  if (done) {
    return (
      <div className="practice-container">
        <h2>Practice Complete!</h2>
        <p>
          Correct: {correctCount} / {total} (
          {Math.round((correctCount / total) * 100)}%)
        </p>
        <button onClick={onExitPractice} className="btn">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="practice-container">
      <FlashCard
        card={cards[currentIndex]}
        index={currentIndex}
        total={total}
        onAnswer={handleAnswer}
      />
      <button onClick={onExitPractice} className="btn">
        Exit
      </button>
    </div>
  );
}
