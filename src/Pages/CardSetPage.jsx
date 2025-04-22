import { useState } from "react";
import AddCardSetForm from "../components/AddCardSetForm";
import CardSetItem from "../components/CardSetItem";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import { ROLE } from "../constants";
import "../components/CardSetItem.css";

import {
  fetchCreateCardSet,
  fetchDeleteCardSet,
  fetchUpdateCardSetTitle,
} from "../services/cardSetServices";

export default function CardSetPage({
  cardSets,
  role,
  isPending,
  onSelectSet,
  onRefresh,
  onPageChange,
  currentPage,
  totalCount,
  setError,
  onPractice,
  dispatch,
}) {
  const [isAdding, setIsAdding] = useState(false);

  const SHOW = {
    PENDING: "pending",
    EMPTY: "empty",
    CARDSETS: "cardsets",
  };

  let show;
  if (isPending) {
    show = SHOW.PENDING;
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
      {role === ROLE.USER ? <h2>My Card Sets</h2> : <h2>All Card Sets</h2>}

      {show === SHOW.PENDING && (
        <Loading className="cardSets__waiting">Loading Card Sets...</Loading>
      )}

      {isAdding && (
        <AddCardSetForm
          onSubmit={handleAdd}
          onCancel={() => setIsAdding(false)}
          dispatch={dispatch}
        />
      )}

      {!isAdding && role !== ROLE.ADMIN && (
        <button onClick={() => setIsAdding(true)} className="btn">
          Add Set
        </button>
      )}

      {show === SHOW.EMPTY && <p>You have no card sets yet.</p>}

      {show === SHOW.CARDSETS && (
        <ul className="card-sets">
          {Object.values(cardSets).map((cardSet) => (
            <li className="card-set" key={cardSet.id}>
              <CardSetItem
                cardSet={cardSet}
                onSelect={onSelectSet}
                onDelete={onDelete}
                onEdit={onEdit}
                role={role}
                onPractice={onPractice}
                dispatch={dispatch}
              />
            </li>
          ))}
        </ul>
      )}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={5}
        onPageChange={onPageChange}
      />
    </div>
  );
}
