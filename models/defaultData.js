import cardSets from "./cardSets.js";
import cards from "./cards.js";
import users from "./users.js";

users.addUser("user1");
users.getUser("user1").role = "user";

users.addUser("user2");
users.getUser("user2").role = "user";

users.addUser("admin");
users.getUser("admin").role = "admin";

const user1Set1 = cardSets.createCardSet("user1", { title: "user1 Set 1" });
user1Set1.cardIds.push(
  cards.createCard({ question: "2 + 3 = ?", answer: "5", createdBy: "user1" })
    .id,
  cards.createCard({ question: "7 + 5 = ?", answer: "12", createdBy: "user1" })
    .id,
  cards.createCard({ question: "10 + 4 = ?", answer: "14", createdBy: "user1" })
    .id,
  cards.createCard({ question: "1 + 8 = ?", answer: "9", createdBy: "user1" })
    .id,
  cards.createCard({ question: "6 + 6 = ?", answer: "12", createdBy: "user1" })
    .id,
  cards.createCard({ question: "0 + 9 = ?", answer: "9", createdBy: "user1" })
    .id
);

const user1Set2 = cardSets.createCardSet("user1", { title: "user1 Set 2" });
user1Set2.cardIds.push(
  cards.createCard({ question: "9 - 4 = ?", answer: "5", createdBy: "user1" })
    .id,
  cards.createCard({ question: "6 - 2 = ?", answer: "4", createdBy: "user1" })
    .id
);

const user1Set3 = cardSets.createCardSet("user1", { title: "user1 Set 3" });
user1Set3.cardIds.push(
  cards.createCard({ question: "3 + 6 = ?", answer: "9", createdBy: "user1" })
    .id,
  cards.createCard({ question: "8 + 1 = ?", answer: "9", createdBy: "user1" })
    .id
);

const user1Set4 = cardSets.createCardSet("user1", { title: "user1 Set 4" });
user1Set4.cardIds.push(
  cards.createCard({ question: "5 - 3 = ?", answer: "2", createdBy: "user1" })
    .id,
  cards.createCard({ question: "10 - 7 = ?", answer: "3", createdBy: "user1" })
    .id
);

const user1Set5 = cardSets.createCardSet("user1", { title: "user1 Set 5" });
user1Set5.cardIds.push(
  cards.createCard({ question: "4 + 2 = ?", answer: "6", createdBy: "user1" })
    .id,
  cards.createCard({ question: "5 + 3 = ?", answer: "8", createdBy: "user1" })
    .id
);

const user1Set6 = cardSets.createCardSet("user1", { title: "user1 Set 6" });
user1Set6.cardIds.push(
  cards.createCard({ question: "7 - 5 = ?", answer: "2", createdBy: "user1" })
    .id,
  cards.createCard({ question: "6 - 1 = ?", answer: "5", createdBy: "user1" })
    .id
);

const user2Set1 = cardSets.createCardSet("user2", { title: "user2 Set 1" });
user2Set1.cardIds.push(
  cards.createCard({ question: "3 × 4 = ?", answer: "12", createdBy: "user2" })
    .id,
  cards.createCard({ question: "5 × 6 = ?", answer: "30", createdBy: "user2" })
    .id,
  cards.createCard({ question: "7 × 8 = ?", answer: "56", createdBy: "user2" })
    .id,
  cards.createCard({ question: "2 × 9 = ?", answer: "18", createdBy: "user2" })
    .id,
  cards.createCard({ question: "0 × 7 = ?", answer: "0", createdBy: "user2" })
    .id,
  cards.createCard({ question: "4 × 3 = ?", answer: "12", createdBy: "user2" })
    .id
);

const user2Set2 = cardSets.createCardSet("user2", { title: "user2 Set 2" });
user2Set2.cardIds.push(
  cards.createCard({ question: "12 ÷ 3 = ?", answer: "4", createdBy: "user2" })
    .id,
  cards.createCard({ question: "18 ÷ 6 = ?", answer: "3", createdBy: "user2" })
    .id
);

const user2Set3 = cardSets.createCardSet("user2", { title: "user2 Set 3" });
user2Set3.cardIds.push(
  cards.createCard({ question: "6 × 6 = ?", answer: "36", createdBy: "user2" })
    .id,
  cards.createCard({ question: "3 × 7 = ?", answer: "21", createdBy: "user2" })
    .id
);

const user2Set4 = cardSets.createCardSet("user2", { title: "user2 Set 4" });
user2Set4.cardIds.push(
  cards.createCard({ question: "8 ÷ 2 = ?", answer: "4", createdBy: "user2" })
    .id,
  cards.createCard({ question: "16 ÷ 4 = ?", answer: "4", createdBy: "user2" })
    .id
);

const user2Set5 = cardSets.createCardSet("user2", { title: "user2 Set 5" });
user2Set5.cardIds.push(
  cards.createCard({ question: "2 × 3 = ?", answer: "6", createdBy: "user2" })
    .id,
  cards.createCard({ question: "9 ÷ 3 = ?", answer: "3", createdBy: "user2" })
    .id
);

const user2Set6 = cardSets.createCardSet("user2", { title: "user2 Set 6" });
user2Set6.cardIds.push(
  cards.createCard({ question: "6 × 2 = ?", answer: "12", createdBy: "user2" })
    .id,
  cards.createCard({ question: "15 ÷ 5 = ?", answer: "3", createdBy: "user2" })
    .id
);

const user2Set7 = cardSets.createCardSet("user2", { title: "user2 Set 7" });
user2Set7.cardIds.push(
  cards.createCard({ question: "3 × 5 = ?", answer: "15", createdBy: "user2" })
    .id,
  cards.createCard({ question: "20 ÷ 4 = ?", answer: "5", createdBy: "user2" })
    .id
);
