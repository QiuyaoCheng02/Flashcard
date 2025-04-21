import CardItem from "../components/CardItem";
import AddCardForm from "../components/AddCardForm";
import { fetchCreateCard, fetchUpdateCard } from "../services/cardServices";
import { useState } from "react";
import { fetchRemoveCardFromSet } from "../services/cardSetServices";
import Loading from "../Loading";
import { ROLE } from "../constants";

export default function CardsPage({
  cards,
  title,
  onPractice,
  setError,
  isPending,
  onRefreshCards,
  selectedSetId,
  role,
  createdBy,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    CARDS: "cards",
    ADDING: "adding",
  };

  let show;
  if (isPending) {
    show = SHOW.PENDING;
  } else if (isAdding) {
    show = SHOW.ADDING;
  } else if (!Object.keys(cards).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.CARDS;
  }

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

  function onEdit(cardId, updates) {
    fetchUpdateCard(cardId, updates)
      .then(() => {
        setError("");
        return onRefreshCards();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onDelete(setId, cardId) {
    fetchRemoveCardFromSet(setId, cardId)
      .then(() => {
        setError("");
        return onRefreshCards();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  return (
    <div className="Cards-list">
      <h2>Cards in {title}</h2>
      {role === ROLE.ADMIN && <p>Created By {createdBy}</p>}
      {show === SHOW.PENDING && (
        <Loading className="cardSets__waiting">Loading Cards...</Loading>
      )}
      {show === SHOW.ADDING ? (
        <AddCardForm
          onSubmit={handleCreateCard}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Card</button>
      )}
      {show === SHOW.EMPTY && <p>You have no card sets yet. Try to add one!</p>}
      {show === SHOW.CARDS && (
        <ul className="cards">
          {Object.values(cards).map((card) => (
            <li className="card" key={card.id}>
              <CardItem
                card={card}
                onDelete={onDelete}
                onEdit={onEdit}
                setId={selectedSetId}
              />
            </li>
          ))}
        </ul>
      )}
      {role !== ROLE.ADMIN && (
        <button onClick={onPractice}>Start Practice</button>
      )}
    </div>
  );
}
