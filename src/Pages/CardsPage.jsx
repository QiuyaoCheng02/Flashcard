import CardItem from "../components/CardItem";
import AddCardForm from "../components/AddCardForm";
import { fetchCreateCard } from "../services/cardServices";
import { useState } from "react";

export default function CardsPage({
  cards,
  title,
  onPractice,
  setError,
  isPending,
  onRefreshCards,
  selectedSetId,
}) {
  const [isAdding, setIsAdding] = useState(false);

  function handleCreateCard(question, answer) {
    const cardData = { setId: selectedSetId, question, answer };

    fetchCreateCard(cardData)
      .then(() => {
        setError("");
        setIsAdding(false);
        return onRefreshCards();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  return (
    <div className="Cards-list">
      <h2>Cards in {title}</h2>
      {isAdding ? (
        <AddCardForm
          onSubmit={handleCreateCard}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Card</button>
      )}
      {isPending && <p>Loading card sets...</p>}
      <CardItem cards={cards} />
      <button onClick={onPractice}>Start Practice</button>
    </div>
  );
}
