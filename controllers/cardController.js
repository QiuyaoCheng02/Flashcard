import cards from "../models/cards.js";
import cardSets from "../models/cardSets.js";
import sessions from "../models/sessions.js";
import users from "../models/users.js";
const cardController = {};

cardController.getCard = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }

  const { cardId } = req.params;
  const card = cards.getCardById(cardId);
  if (!card) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Card with id ${cardId}` });
  }
  res.json(card);
};

//for card set
cardController.getCardsBySet = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { setId } = req.params;
  const set = cardSets.getCardSetById(setId);
  if (!set) {
    res
      .status(404)
      .json({ error: "noSuchSet", message: `No set with id ${setId}` });
    return;
  }

  const allCards = cards.getCardsByIds(set.cardIds || []);
  res.json(allCards);
};

cardController.createCard = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }

  const { setId, question, answer } = req.body;
  const createdBy = username;
  if (!question || !answer || !createdBy) {
    res.status(400).json({ error: `missing-fields` });
    return;
  }

  const newCard = cards.createCard({ question, answer, createdBy });
  cardSets.addCardToSet(setId, newCard.id);
  res.json(newCard);
};

cardController.updateCard = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }

  const { cardId } = req.params;
  const updates = req.body;
  const updatedCard = cards.updateCardContent(cardId, updates);
  if (!updatedCard) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Card with id ${cardId}` });
    return;
  }
  res.json(updatedCard);
};

//update card stats
cardController.updateCardStats = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { cardId } = req.params;
  const { wasCorrect } = req.body;

  if (typeof wasCorrect !== "boolean") {
    res.status(400).json({ error: `missing-or-invalid-wasCorrect` });
    return;
  }

  const card = cards.getCardById(cardId);
  if (!card) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Card with id ${cardId}` });
    return;
  }

  cards.updateCardStats(cardId, wasCorrect);
  res.json({
    message: `stats-updated`,
    cardId,
    correctCount: card.correctCount,
    totalCount: card.totalCount,
  });
};

cardController.deleteCard = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { cardId } = req.params;
  const deleted = cards.deleteCard(cardId);
  if (!deleted) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Card with id ${cardId}` });
    return;
  }
  res.json({ deleted });
};

export default cardController;
