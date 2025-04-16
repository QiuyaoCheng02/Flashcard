import { randomUUID as uuid } from "crypto";

const cardsById = {};

function generateCardId() {
  return `card-${uuid()}`;
}

function createCard({ question, answer, createdBy }) {
  const id = generateCardId();
  cardsById[id] = {
    id,
    question,
    answer,
    createdBy,
    stats: {
      timesAttempted: 0,
      timesWrong: 0,
    },
  };
  return cardsById[id];
}
//get one card
function getCardById(cardId) {
  return cardsById[cardId];
}

//generate whole set
function getCardsByIds(cardIds) {
  return cardIds.map((id) => cardsById[id]).filter(Boolean);
}

function updateCard(cardId, updates) {
  const card = cardsById[cardId];
  if (!card) return null;

  card.question = updates.question || card.question;
  card.answer = updates.answer || card.answer;

  return card;
}

function updateCardStats(cardId, wasCorrect) {
  console.log("update stats ");
  const card = cardsById[cardId];
  if (!card) return;
  card.stats.timesAttempted += 1;
  if (!wasCorrect) {
    card.stats.timesWrong += 1;
  }
  console.log(
    card.id,
    "times attempted:",
    card.stats.timesAttempted,
    " times wrong: ",
    card.stats.timesWrong
  );
}

function deleteCard(cardId) {
  if (!cardsById[cardId]) return false;
  delete cardsById[cardId];
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
