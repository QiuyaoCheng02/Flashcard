// components/CardList.jsx
export default function CardItem({ cards }) {
  return (
    <div className="card-item">
      <ul>
        {cards.map((card) => {
          const stats = card.stats || { timesAttempted: 0, timesWrong: 0 };
          const correctCount = stats.timesAttempted - stats.timesWrong;
          const correctRate =
            stats.timesAttempted > 0
              ? Math.round((correctCount / stats.timesAttempted) * 100)
              : "N/A";

          return (
            <li key={card.id}>
              <strong>Q:</strong> {card.question}
              <br />
              <strong>A:</strong> {card.answer}
              <p>
                Correct Rate:{" "}
                {correctRate === "N/A" ? "Not attempted" : `${correctRate}%`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
