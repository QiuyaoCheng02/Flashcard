import { useState, useEffect } from "react";
import { fetchLogin, fetchLogout, fetchSession } from "./services/authServices";
import { fetchGetCard, fetchGetCards } from "./services/cardServices";
import { fetchGetCardSet, fetchGetCardSets } from "./services/cardSetServices";
import CardSet from "./components/CardSetsItem";
import CardList from "./components/CardItem";
import FlashCard from "./components/FlashCard";

import "./App.css";
import Login from "./Login";
import Status from "./Status";
import { LOGIN_STATUS, CLIENT, SERVER } from "./constants";
import Controls from "./components/Controls";

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [cardSets, setCardSets] = useState([]);
  const [cardsBySet, setCardsBySet] = useState({});
  const [selectedSetId, setSelectedSetId] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  function checkSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setSelectedSetId(null);
        setIsPracticing(false);
        setSelectedCards([]);

        return fetchGetCardSets();
      })
      .then(({ sets }) => {
        setCardSets(sets);
        const allCardIds = sets.flatMap((set) => set.cardIds);
        return fetchGetCards(allCardIds).then((cards) => {
          const grouped = {};
          sets.forEach((set) => {
            grouped[set.id] = cards.filter((card) =>
              set.cardIds.includes(card.id)
            );
          });
          setCardsBySet(grouped);
        });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  function onRefresh() {
    setError("");
  }

  function onLogin(username) {
    setIsPending(true);
    fetchLogin(username)
      .then(({ username }) => {
        setError("");
        setIsPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setSelectedSetId(null);
        setIsPracticing(false);
        setSelectedCards([]);

        return fetchGetCardSets();
      })
      .then(({ sets }) => {
        setCardSets(sets);
        const allCardIds = sets.flatMap((set) => set.cardIds);
        return fetchGetCards(allCardIds).then((cards) => {
          const grouped = {};
          sets.forEach((set) => {
            grouped[set.id] = cards.filter((card) =>
              set.cardIds.includes(card.id)
            );
          });
          setCardsBySet(grouped);
        });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  return (
    <div className="app">
      <main>
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <Login onLogin={onLogin} />
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout} onRefresh={onRefresh} />
            <p>Hello, {username}</p>
            {!selectedSetId && !isPracticing && (
              <CardSet
                cardSets={cardSets}
                onSelect={(id) => setSelectedSetId(id)}
              />
            )}

            {selectedSetId && !isPracticing && (
              <CardList
                cards={cardsBySet[selectedSetId] || []}
                onStart={() => {
                  setSelectedCards(cardsBySet[selectedSetId] || []);
                  setIsPracticing(true);
                }}
              />
            )}

            {isPracticing && <FlashCard cards={selectedCards} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
