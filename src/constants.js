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
export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  INVALID_INPUT: "invalid-input",
  REQUIRED_USERNAME: "required-username",
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  [SERVER.AUTH_INSUFFICIENT]: "Your username can't be dog, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.INVALID_INPUT]: "Invalid word, please try again",
  default: "Something went wrong.  Please try again",
};
