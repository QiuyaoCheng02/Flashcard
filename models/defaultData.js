import cardSets from "./cardSets.js";
import cards from "./cards.js";
import users from "./users.js";

// Register default users
users.addUser("user1");
users.getUser("user1").role = "user";

users.addUser("user2");
users.getUser("user2").role = "user";

users.addUser("admin");
users.getUser("admin").role = "admin";

// Create 6 sets for user1
for (let s = 1; s <= 6; s++) {
  const set = cardSets.createCardSet("user1", { title: `user1 Set ${s}` });
  const numCards = s === 1 ? 6 : 2; // First set has 6 cards, rest have 2
  for (let i = 1; i <= numCards; i++) {
    const card = cards.createCard({
      question: `user1 Set${s} Q${i}`,
      answer: `user1 Set${s} A${i}`,
      createdBy: "user1",
    });
    set.cardIds.push(card.id);
  }
}

// Create 7 sets for user2
for (let s = 1; s <= 7; s++) {
  const set = cardSets.createCardSet("user2", { title: `user2 Set ${s}` });
  const numCards = s === 1 ? 6 : 2; // First set has 6 cards, rest have 2
  for (let i = 1; i <= numCards; i++) {
    const card = cards.createCard({
      question: `user2 Set${s} Q${i}`,
      answer: `user2 Set${s} A${i}`,
      createdBy: "user2",
    });
    set.cardIds.push(card.id);
  }
}
