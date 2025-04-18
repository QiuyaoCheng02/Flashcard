import { useState, useEffect } from "react";
import { fetchLogin, fetchLogout, fetchSession } from "./services/authServices";
import { fetchGetCardsBySetId } from "./services/cardServices";
import { fetchGetCardSet, fetchGetCardSets } from "./services/cardSetServices";

import CardSetPage from "./Pages/CardSetPage";
import CardsPage from "./Pages/CardsPage";
import PracticePage from "./Pages/PracticePage";
import "./App.css";
import Login from "./Login";
import Status from "./Status";
import { LOGIN_STATUS, PAGE, CLIENT, SERVER } from "./constants";
import Controls from "./components/Controls";

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState("");
  const [cardSets, setCardSets] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const selectedSet = cardSets.find((set) => set.id === selectedSetId);

  useEffect(() => {
    checkSession();
  }, []);

  function checkSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setCards([]);
        setSelectedSetId(null);
        setIsPracticing(false);
        setPage(PAGE.CARD_SETS);
        setError("");
        return fetchGetCardSets();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(({ sets }) => {
        setCardSets(sets);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  function onRefresh() {
    setError("");
    onGetSet();
  }

  function onGetSet() {
    setIsPending(true);
    fetchGetCardSets()
      .then(({ sets }) => {
        setCardSets(sets);
        setIsPending(false);
        setCards([]);
        setSelectedSetId();
        setIsPracticing(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err?.error || "ERROR");
      });
  }

  function onLogin(username) {
    setIsPending(true);
    fetchLogin(username)
      .then(({ username }) => {
        setError("");
        setIsPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setPage(PAGE.CARD_SETS);
        onGetSet();
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

  function onGetCards(setId) {
    setIsPending(true);
    return fetchGetCardsBySetId(setId);
  }

  function onSelectSet(setId) {
    setSelectedSetId(setId);
    setPage(PAGE.CARDS);

    onGetCards(setId)
      .then((cards) => {
        setIsPending(false);
        setCards(cards);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err?.error || "ERROR");
      });
  }
  function onRefreshCards() {
    if (!selectedSetId) {
      setError("No set selected");
      return;
    }

    onGetCards(selectedSetId)
      .then((cards) => {
        setCards(cards);

        setError("");
        setIsPending(false);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        setIsPending(false);
      });
  }
  function onExit() {
    setPage(PAGE.CARDS);
    onGetCards(selectedSetId)
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }
  function onPractice() {
    setPage(PAGE.PRACTICE);
    return;
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
            {page === PAGE.CARD_SETS && (
              <CardSetPage
                cardSets={cardSets}
                isPending={isPending}
                onSelectSet={onSelectSet}
                onRefresh={onRefresh}
                setError={setError}
              />
            )}
            {page === PAGE.CARDS && selectedSet && (
              <CardsPage
                cards={cards}
                title={selectedSet.title}
                onPractice={onPractice}
                onRefreshCards={onRefreshCards}
                setError={setError}
                isPending={isPending}
                selectedSetId={selectedSetId}
              />
            )}
            {page === PAGE.PRACTICE && selectedSet && (
              <PracticePage cards={cards} onExit={onExit} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
