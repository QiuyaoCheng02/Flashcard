import { randomUUID as uuid } from "crypto";

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

export default {
  getCardSetsByUser,
  getCardSetById,
  getAllCardSets,
  createCardSet,
  updateCardSetTitle,
  addCardToSet,
  deleteCardSet,
  removeCardFromSet,
};
