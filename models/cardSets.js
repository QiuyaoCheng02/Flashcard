import { randomUUID as uuid } from "crypto";
import { defaultCardIds1, defaultCardIds2 } from "./cards.js";

const cardSets = {};

function generateSetId() {
  return `set-${uuid()}`;
}

function getCardSetsByUser(username) {
  return Object.values(cardSets).filter((set) => set.createdBy === username);
}

function getCardSetById(setId) {
  return cardSets[setId];
}
function getAllCardSets() {
  return Object.values(cardSets);
}

function createCardSet(username, { title }) {
  const newSet = {
    id: generateSetId(),
    title,
    createdBy: username,
    cardIds: [],
    bestScore: null,
    isPublic: false,
    stats: {
      totalAttempts: 0,
      averageAccuracy: 0,
    },
  };

  cardSets[newSet.id] = newSet;
  return newSet;
}

function updateCardSetTitle(setId, newTitle) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  set.title = newTitle;
  return set;
}

function updateBestScore(setId, score) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  if (set.bestScore === null || score > set.bestScore) {
    set.bestScore = score;
  }
}

function addCardToSet(setId, cardId) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  if (!set.cardIds.includes(cardId)) {
    set.cardIds.push(cardId);
  }
}
function deleteCardSet(setId) {
  if (!cardSets[setId]) {
    return false;
  }
  delete cardSets[setId];
  return true;
}

function removeCardFromSet(setId, cardId) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  set.cardIds = set.cardIds.filter((id) => id !== cardId);
  return true;
}

function recordAccuracy(setId, newAccuracy) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  const { totalAttempts, averageAccuracy } = set.stats;
  set.stats.totalAttempts += 1;
  set.stats.averageAccuracy =
    (averageAccuracy * totalAttempts + newAccuracy) / set.stats.totalAttempts;
}

function getAverageAccuracy(setId) {
  const set = getCardSetById(setId);
  if (!set) {
    return null;
  }
  if (set.stats.totalAttempts === 0) {
    return "no attempts yet!";
  }
  return set.stats.averageAccuracy;
}

//default card set
const defaultSet1 = createCardSet("user1", { title: "Default Math Set" });
defaultSet1.cardIds.push(...defaultCardIds1);

const defaultSet2 = createCardSet("user2", { title: "Default Math Set" });
defaultSet2.cardIds.push(...defaultCardIds2);

export default {
  getCardSetsByUser,
  getCardSetById,
  getAllCardSets,
  createCardSet,
  updateCardSetTitle,
  updateBestScore,
  addCardToSet,
  recordAccuracy,
  getAverageAccuracy,
  deleteCardSet,
  removeCardFromSet,
};
