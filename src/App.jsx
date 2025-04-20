import { useState, useEffect, useReducer } from "react";
import {
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchRegister,
} from "./services/authServices";
import { fetchGetCardsBySetId } from "./services/cardServices";
import { fetchGetCardSets } from "./services/cardSetServices";
import RegsiterPage from "./Pages/RegisterPage";
import CardSetPage from "./Pages/CardSetPage";
import CardsPage from "./Pages/CardsPage";
import PracticePage from "./Pages/PracticePage";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Status from "./Status";
import { LOGIN_STATUS, PAGE, CLIENT, SERVER } from "./constants";
import Controls from "./components/Controls";

const initState = {
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  username: "",
  page: PAGE.LOGIN,
  error: "",
  cardSets: [],
  cards: [],
  selectedSetId: null,
  isPending: false,
  isPracticing: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "register":
      return {
        ...state,
        page: PAGE.REGISTER,
        error: "",
      };
    case "login":
      return {
        ...state,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        page: PAGE.CARD_SETS,
        cardSets: [],
        cards: [],
        selectedSetId: null,
        error: "",
        isPending: false,
        isPracticing: false,
      };
    case "toLoginPage":
      return {
        ...state,
        page: PAGE.LOGIN,
        error: "",
      };
    case "toRegisterPage":
      return {
        ...state,
        page: PAGE.REGISTER,
        error: "",
      };
    case "logout":
      return {
        ...state,
        error: "",
        username: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        page: PAGE.LOGIN,
      };
    case "onGetCards":
      return {
        ...state,
        selectedSetId: action.selectedSetId,
        cards: action.cards,
        isPending: false,
        error: "",
      };
    case "onPractice":
      return {
        ...state,
        page: PAGE.PRACTICE,
        error: "",
      };
    case "setError":
      return { ...state, error: action.error };
    case "setPage":
      return { ...state, page: action.page };
    case "setCardSets":
      return { ...state, cardSets: action.cardSets };
    case "setCards":
      return { ...state, cards: action.cards };
    case "setSelectedSetId":
      return { ...state, selectedSetId: action.setId };
    case "setPending":
      return { ...state, isPending: action.isPending };
    case "setPracticing":
      return { ...state, isPracticing: action.isPracticing };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const selectedSet = state.cardSets.find(
    (set) => set.id === state.selectedSetId
  );

  useEffect(() => {
    checkSession();
  }, []);

  function checkSession() {
    fetchSession()
      .then((session) => {
        dispatch({ type: "login", username: session.username });
        return fetchGetCardSets();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(({ sets }) => {
        dispatch({ type: "setCardSets", cardSets: sets });
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: "logout" });
          return;
        }
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onRefresh() {
    dispatch({ type: "setError", error: "" });
    onGetSet();
  }

  function onGetSet() {
    dispatch({ type: "setPending", isPending: true });
    fetchGetCardSets()
      .then(({ sets }) => {
        dispatch({ type: "setCardSets", cardSets: sets });
        dispatch({ type: "setPending", isPending: false });
        dispatch({ type: "setCards", cards: [] });
        dispatch({ type: "setSelectedSetId", selectedSetId: null });
        dispatch({ type: "setPracticing", isPracticing: false });
      })
      .catch((err) => {
        dispatch({ type: "setPending", isPending: false });
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onLogin(username) {
    dispatch({ type: "setPending", isPending: true });
    fetchLogin(username)
      .then(({ username }) => {
        dispatch({ type: "login", username: username });
        onGetSet();
      })
      .catch((err) => {
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }
  function onRegister(username) {
    fetchRegister(username)
      .then(() => {
        dispatch({ type: "toLoginPage" });
      })
      .catch((err) => {
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onLogout() {
    dispatch({ type: "logout" });
    fetchLogout().catch((err) => {
      dispatch({ type: "setError", error: err?.error || "ERROR" });
    });
  }

  function onGetCards(setId) {
    dispatch({ type: "setPending", isPending: true });
    return fetchGetCardsBySetId(setId);
  }

  function onSelectSet(setId) {
    dispatch({ type: "setPending", isPending: true });
    dispatch({ type: "setPage", page: PAGE.CARDS });

    onGetCards(setId)
      .then((cards) => {
        dispatch({ type: "onGetCards", selectedSetId: setId, cards: cards });
      })
      .catch((err) => {
        dispatch({ type: "setPending", isPending: false });
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onRefreshCards() {
    if (!state.selectedSetId) {
      dispatch({ type: "setError", error: err?.error || "ERROR" });
      return;
    }
    dispatch({ type: "setPending", isPending: true });
    dispatch({ type: "setPage", page: PAGE.CARDS });

    onGetCards(state.selectedSetId)
      .then((cards) => {
        dispatch({
          type: "onGetCards",
          selectedSetId: state.selectedSetId,
          cards: cards,
        });
      })
      .catch((err) => {
        dispatch({ type: "setPending", isPending: false });
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onExitPractice() {
    dispatch({ type: "setPending", isPending: true });
    dispatch({ type: "setPage", page: PAGE.CARDS });

    onGetCards(state.selectedSetId)
      .then((cards) => {
        dispatch({
          type: "onGetCards",
          selectedSetId: state.selectedSetId,
          cards: cards,
        });
      })
      .catch((err) => {
        dispatch({ type: "setPending", isPending: false });
        dispatch({ type: "setError", error: err?.error || "ERROR" });
      });
  }

  function onPractice() {
    dispatch({ type: "onPractice" });
    return;
  }

  return (
    <div className="app">
      <main>
        {state.error && <Status error={state.error} />}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN &&
          state.page === PAGE.LOGIN && (
            <LoginPage onLogin={onLogin} dispatch={dispatch} />
          )}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN &&
          state.page === PAGE.REGISTER && (
            <RegsiterPage onRegister={onRegister} dispatch={dispatch} />
          )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout} onRefresh={onRefresh} />
            <p>Hello, {state.username}</p>
            {state.page === PAGE.CARD_SETS && (
              <CardSetPage
                cardSets={state.cardSets}
                isPending={state.isPending}
                onSelectSet={onSelectSet}
                onRefresh={onRefresh}
                setError={(err) => dispatch({ type: "setError", error: err })}
              />
            )}
            {state.page === PAGE.CARDS && selectedSet && (
              <CardsPage
                cards={state.cards}
                title={selectedSet.title}
                onPractice={onPractice}
                onRefreshCards={onRefreshCards}
                setError={(err) => dispatch({ type: "setError", error: err })}
                isPending={state.isPending}
                selectedSetId={state.selectedSetId}
              />
            )}
            {state.page === PAGE.PRACTICE && selectedSet && (
              <PracticePage
                cards={state.cards}
                onExitPractice={onExitPractice}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
