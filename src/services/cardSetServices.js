export function fetchGetCardSets() {
  return fetch("/api/cardsets", {
    method: "GET",
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchGetCardSet(setId) {
  return fetch(`/api/cardsets/${setId}`, {
    method: "GET",
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchCreateCardSet(data) {
  return fetch("/api/cardsets", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchUpdateCardSetTitle(setId, newTitle) {
  return fetch(`/api/cardsets/${setId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchDeleteCardSet(setId) {
  return fetch(`/api/cardsets/${setId}`, {
    method: "DELETE",
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchRemoveCardFromSet(setId, cardId) {
  return fetch(`/api/cardsets/${setId}/cards/${cardId}`, {
    method: "DELETE",
    credentials: "include",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}
