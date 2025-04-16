import { randomUUID as uuid } from "crypto";
import { defaultCardIds1, defaultCardIds2 } from "./cards.js";

const cardSets = {};

function generateSetId() {
  return `set-${uuid()}`;
}

function getCardSetsByUser(username) {
  return cardSets[username] || [];
}

function getCardSetById(username, setId) {
  return getCardSetsByUser(username).find((set) => set.id === setId);
}

function createCardSet(username, { title, cardIds }) {
  const newSet = {
    id: generateSetId(),
    title,
    cardIds: [...cardIds],
    bestScore: null,
    isPublic: false,
    stats: {
      totalAttempts: 0,
      cumulativeAccuracy: 0,
    },
  };

  if (!cardSets[username]) {
    cardSets[username] = [];
  }

  cardSets[username].push(newSet);
  return newSet;
}

function updateCardSetTitle(username, setId, newTitle) {
  const set = getCardSetById(username, setId);
  if (!set) {
    return null;
  }
  set.title = newTitle;
  return set;
}

function updateBestScore(username, setId, score) {
  const set = getCardSetById(username, setId);
  if (!set) {
    return;
  }
  if (set.bestScore === null || score > set.bestScore) {
    set.bestScore = score;
  }
}

function addCardToSet(username, setId, cardId) {
  const set = getCardSetById(username, setId);
  if (!set) {
    return;
  }
  if (!set.cardIds.includes(cardId)) {
    set.cardIds.push(cardId);
  }
}
function deleteCardSet(username, setId) {
  if (!cardSets[username]) {
    return false;
  }
  const index = cardSets[username].findIndex((set) => set.id === setId);
  if (index === -1) {
    return false;
  }
  cardSets[username].splice(index, 1);
  return true;
}

function removeCardFromSet(username, setId, cardId) {
  const set = getCardSetById(username, setId);
  if (!set) {
    return false;
  }
  set.cardIds = set.cardIds.filter((id) => id !== cardId);
  return true;
}

function recordAccuracy(set, newAccuracy) {
  const { totalAttempts, averageAccuracy } = set.stats;
  set.stats.totalAttempts += 1;
  set.stats.averageAccuracy =
    (averageAccuracy * totalAttempts + newAccuracy) / set.stats.totalAttempts;
}

function getAverageAccuracy(username, setId) {
  const set = getCardSetById(username, setId);
  if (!set || set.stats.totalAttempts === 0) {
    return "no attempts yet!";
  }
  return set.stats.averageAccuracy;
}

//default card set
cardSets["user1"] = [
  {
    id: generateSetId(),
    title: "Default Math Set",
    cardIds: [...defaultCardIds1],
    bestScore: null,
    isPublic: false,
    stats: { totalAttempts: 0, averageAccuracy: 0 },
  },
];
cardSets["user2"] = [
  {
    id: generateSetId(),
    title: "Default Math Set",
    cardIds: [...defaultCardIds2],
    bestScore: null,
    isPublic: false,
    stats: { totalAttempts: 0, averageAccuracy: 0 },
  },
];
export default {
  getCardSetsByUser,
  getCardSetById,
  createCardSet,
  updateCardSetTitle,
  updateBestScore,
  addCardToSet,
  recordAccuracy,
  getAverageAccuracy,
  deleteCardSet,
  removeCardFromSet,
};
