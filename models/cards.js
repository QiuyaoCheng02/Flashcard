import { randomUUID as uuid } from "crypto";

const cards = {};

function generateCardId() {
  const id = uuid();
  return `card-${id}`;
}

function createCard({ question, answer, createdBy }) {
  const id = generateCardId();
  cards[id] = {
    id,
    question,
    answer,
    createdBy,
    stats: {
      timesAttempted: 0,
      timesWrong: 0,
    },
  };

  return cards[id];
}
//get one card
function getCardById(cardId) {
  return cards[cardId];
}

//generate whole set
function getCardsByIds(cardIds) {
  return cardIds.map((id) => cards[id]).filter(Boolean);
}

function updateCard(cardId, updates) {
  const card = cards[cardId];
  if (!card) return null;

  card.question = updates.question || card.question;
  card.answer = updates.answer || card.answer;

  return card;
}

function updateCardStats(cardId, wasCorrect) {
  const card = cards[cardId];
  if (!card) return;
  card.stats.timesAttempted += 1;
  if (!wasCorrect) {
    card.stats.timesWrong += 1;
  }
}

function deleteCard(cardId) {
  if (!cards[cardId]) return false;
  delete cards[cardId];
  return true;
}

export default {
  createCard,
  getCardById,
  getCardsByIds,
  updateCard,
  updateCardStats,
  deleteCard,
};
