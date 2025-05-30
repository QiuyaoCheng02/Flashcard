import cardSets from "../models/cardSets.js";
import sessions from "../models/sessions.js";
import users from "../models/users.js";

const cardSetController = {};

cardSetController.getCardSets = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const sets = cardSets.getCardSetsByUser(username);
  res.json({ sets });
};

cardSetController.getCardSet = function (req, res) {
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
      .json({ error: `noSuchId`, message: `No Set with id ${setId}` });
    return;
  }
  res.json({ set });
};
cardSetController.createCardSet = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: `invalid-input` });
    return;
  }

  const newSet = cardSets.createCardSet(username, { title });
  res.json(newSet);
};

cardSetController.deleteCardSet = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }
  const { setId } = req.params;
  const deleted = cardSets.deleteCardSet(setId);

  if (!deleted) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Set with id ${setId}` });
    return;
  }
  res.json({ deleted });
};

cardSetController.editSetTitle = function (req, res) {
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
      .json({ error: `noSuchId`, message: `No Set with id ${setId}` });
    return;
  }

  const { title } = req.body;
  set.title = title;

  res.json({ title });
};
cardSetController.removeCardFromSet = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: `auth-missing` });
    return;
  }

  const { setId, cardId } = req.params;

  const deleted = cardSets.removeCardFromSet(setId, cardId);

  if (!deleted) {
    res
      .status(404)
      .json({ error: `noSuchId`, message: `No Set or Card with id ${setId}` });
    return;
  }
  res.json({ deleted });
};

export default cardSetController;
