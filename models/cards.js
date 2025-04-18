import { randomUUID as uuid } from "crypto";

const cards = {};

function generateCardId() {
  return `card-${uuid()}`;
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

const DefaultCard1 = createCard({
  question: "2 + 2 = ?",
  answer: "4",
  createdBy: "user1",
});

const DefaultCard2 = createCard({
  question: "5 × 3 = ?",
  answer: "15",
  createdBy: "user1",
});
const DefaultCard3 = createCard({
  question: "2 + 2 = ?",
  answer: "4",
  createdBy: "user2",
});

const DefaultCard4 = createCard({
  question: "5 × 3 = ?",
  answer: "15",
  createdBy: "user2",
});
export const defaultCardIds1 = [DefaultCard1.id, DefaultCard2.id];
export const defaultCardIds2 = [DefaultCard3.id, DefaultCard4.id];

export default {
  createCard,
  getCardById,
  getCardsByIds,
  updateCard,
  updateCardStats,
  deleteCard,
};
