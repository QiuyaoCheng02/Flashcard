import { useState } from "react";
import AddCardSetForm from "../components/AddCardSetForm";
import CardSetItem from "../components/CardSetItem";
import Loading from "../Loading";
import {
  fetchCreateCardSet,
  fetchDeleteCardSet,
  fetchUpdateCardSetTitle,
} from "../services/cardSetServices";

export default function CardSetPage({
  cardSets,
  isPending,
  onSelectSet,
  onRefresh,
  setError,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    CARDSETS: "cardsets",
    ADDING: "adding",
  };

  let show;
  if (isPending) {
    show = SHOW.PENDING;
  } else if (isAdding) {
    show = SHOW.ADDING;
  } else if (!Object.keys(cardSets).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.CARDSETS;
  }
  function handleAdd(title) {
    fetchCreateCardSet({ title })
      .then(() => {
        setError("");
        setIsAdding(false);
        onRefresh();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onDelete(setId) {
    fetchDeleteCardSet(setId)
      .then(() => {
        setError("");
        onRefresh();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }
  function onEdit(setId, newTitle) {
    fetchUpdateCardSetTitle(setId, newTitle)
      .then(() => {
        setError("");
        onRefresh();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  return (
    <div className="cardset-page">
      <h2>My Card Sets</h2>
      {show === SHOW.PENDING && (
        <Loading className="cardSets__waiting">Loading Card Sets...</Loading>
      )}

      {show === SHOW.ADDING ? (
        <AddCardSetForm
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Set</button>
      )}

      {show === SHOW.EMPTY && <p>You have no card sets yet. Try to add one!</p>}

      {show === SHOW.CARDSETS && (
        <ul className="card-sets">
          {Object.values(cardSets).map((cardSet) => (
            <li className="cardSet" key={cardSet.id}>
              <CardSetItem
                cardSet={cardSet}
                onSelect={onSelectSet}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
