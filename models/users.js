const users = {};

function isValidUsername(username) {
  if (typeof username !== "string") {
    return false;
  }

  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function addUser(username) {
  if (users[username]) {
    return users[username];
  }

  const user = {
    username: username,
    role: "user",
  };

  users[username] = user;
  return user;
}

function getUser(username) {
  return users[username];
}

export default {
  isValidUsername,
  addUser,
  getUser,
};
