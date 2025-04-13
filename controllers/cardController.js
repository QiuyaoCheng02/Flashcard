import cards from "../models/cards.js";
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
cardController.getCards = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { cardIds } = req.body;
  const allCards = cards.getCardsByIds(cardIds || []);
  res.json(allCards);
};

cardController.createCard = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }

  const { question, answer, createdBy } = req.body;
  if (!question || !answer || !createdBy) {
    res.status(400).json({ error: `missing-fields` });
    return;
  }

  const newCard = cards.createCard({ question, answer, createdBy });
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
  res.json({ message: `stats-updated`, cardId });
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
