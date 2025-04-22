export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};
export const PAGE = {
  LOGIN: "login",
  REGISTER: "register",
  CARD_SETS: "card-sets",
  CARDS: "cards",
  PRACTICE: "practice",
};
export const ROLE = {
  ADMIN: "admin",
  USER: "user",
};
export const SERVER = {
  AUTH_MISSING: "auth-missing",
  USER_NOT_FOUND: "user-not-found",
  AUTH_INSUFFICIENT: "auth-insufficient",
  INVALID_INPUT: "invalid-input",
  REQUIRED_USERNAME: "required-username",
  USER_EXISTS: "user-exists",
  EMPTY_SET: "empty-set",
  INVALID_CARD: "invalid-card",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  REQUIRED_LOGIN_NAME: "required-login-name",
  REQUIRED_FIELD: "required-field",
  REQUIRED_QUESTION: "required-question",
  REQUIRED_ANSWER: "required-answer",
  REQUIRED_TITLE: "required-title",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [CLIENT.REQUIRED_LOGIN_NAME]: "Login name cannot be empty",
  [CLIENT.REQUIRED_FIELD]: "This field cannot be empty",
  [CLIENT.REQUIRED_QUESTION]: "Question cannot be empty",
  [CLIENT.REQUIRED_ANSWER]: "Answer cannot be empty",
  [CLIENT.REQUIRED_TITLE]: "Title cannot be empty",
  [SERVER.AUTH_INSUFFICIENT]: "Your username can't be dog, please try again.",
  [SERVER.USER_NOT_FOUND]:
    "This username does not exist, please sign up to start.",
  [SERVER.USER_EXISTS]: "This username already exists, please try another one.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.INVALID_INPUT]: "Invalid word, please try again",

  [SERVER.EMPTY_SET]: "Can't practice empty set. This set contains no cards.",
  [SERVER.INVALID_CARD]: "This set contains invalid card",
  REGISTER_SUCCESS: "Registration successful. Please log in to continue.",
  default: "Something went wrong.  Please try again",
};
