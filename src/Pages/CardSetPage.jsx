import { useState } from "react";
import AddCardSetForm from "../components/AddCardSetForm";
import CardSetsItem from "../components/CardSetsItem";
import { createCardSet } from "../services/cardSetServices";

export default function CardSetPage({
  cardSets,
  isPending,
  onSelectSet,
  onRefresh,
  setError,
}) {
  const [isAdding, setIsAdding] = useState(false);

  function handleAdd(title) {
    createCardSet({ title })
      .then(() => {
        setError("");
        setIsAdding(false);
        onRefresh();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  return (
    <div className="cardset-page">
      <h2>My Card Sets</h2>

      {isAdding ? (
        <AddCardSetForm
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Set</button>
      )}

      {isPending && <p>Loading card sets...</p>}

      {!isPending && cardSets.length === 0 && (
        <p>You have no card sets yet. Try to add one!</p>
      )}

      {!isPending && cardSets.length > 0 && (
        <CardSetsItem cardSets={cardSets} onSelect={onSelectSet} />
      )}
    </div>
  );
}
