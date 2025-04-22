import CardItem from "../components/CardItem";
import AddCardForm from "../components/AddCardForm";
import { fetchCreateCard, fetchUpdateCard } from "../services/cardServices";
import { useState } from "react";
import { fetchRemoveCardFromSet } from "../services/cardSetServices";
import Loading from "../Loading";
import { ROLE } from "../constants";
import "../components/CardItem.css";
import backIcon from "../assets/back.png";
import startIcon from "../assets/start.png";
import Pagination from "../components/Pagination";

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
  currentCardPage,
  totalCardCount,
  onPageChange,
  onToSetPage,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    CARDS: "cards",
  };

  let show;
  if (isPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(cards || {}).length) {
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
      <div className="top-controller">
        <div className="btn-left">
          <button className="back-btn btn-icon" onClick={onToSetPage}>
            <img src={backIcon} alt="back" />
          </button>
        </div>

        <div className="title-center">
          <h2>Cards in {title}</h2>
        </div>

        <div className="btn-right">
          {role !== ROLE.ADMIN && show !== SHOW.EMPTY && (
            <button
              className="practice-btn btn-icon"
              onClick={() => onPractice(selectedSetId)}
            >
              <img src={startIcon} alt="Start Practice" />
            </button>
          )}
        </div>
      </div>
      {role === ROLE.ADMIN && <p>Created By {createdBy}</p>}
      {show === SHOW.PENDING && (
        <Loading className="cardSets__waiting">Loading Cards...</Loading>
      )}
      {isAdding && (
        <AddCardForm
          onSubmit={handleCreateCard}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {!isAdding && role !== ROLE.ADMIN && (
        <button onClick={() => setIsAdding(true)} className="btn">
          Add Card
        </button>
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
      <Pagination
        currentPage={currentCardPage}
        totalCount={totalCardCount}
        pageSize={5}
        onPageChange={onPageChange}
      />
    </div>
  );
}
