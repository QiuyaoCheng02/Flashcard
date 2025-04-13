import express from "express";
import cookieParser from "cookie-parser";
import authController from "./controllers/authController.js";
import cardController from "./controllers/cardController.js";
import cardSetController from "./controllers/cardSetController.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static("./dist"));
app.use(express.json());

//sessions
app.get("/api/session", authController.checkSession);
app.post("/api/session", authController.creatSession);
app.delete("/api/session", authController.endSession);

//cards set
app.get("/api/cardsets", cardSetController.getCardSets);
app.get("/api/cardsets/:setId", cardSetController.getCardSet);
app.post("/api/cardsets", cardSetController.createCardSet);
//app.put("/api/cardsets/:setId", cardSetController.updateTitle);
app.delete("/api/cardsets/:setId", cardSetController.deleteCardSet);
app.delete(
  "/api/cardsets/:setId/cards/:cardId",
  cardSetController.removeCardFromSet
);

// cards
app.get("/api/cards/:cardId", cardController.getCard);
app.post("/api/cards/list", cardController.getCards);
app.post("/api/cards", cardController.createCard);
app.put("/api/cards/:cardId", cardController.updateCard);
app.patch("/api/cards/:cardId/stats", cardController.updateCardStats);
app.delete("/api/cards/:cardId", cardController.deleteCard);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
