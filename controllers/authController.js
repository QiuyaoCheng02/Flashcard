import sessions from "../models/sessions.js";
import users from "../models/users.js";

const authController = {};

authController.checkSession = function (req, res) {
  const sid = req.cookies.sid;

  const username = sid ? sessions.getSessionUser(sid) : "";

  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  res.json({ username });
};

authController.creatSession = function (req, res) {
  const username = req.body.username;
  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username.toLowerCase() === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }
  const sid = sessions.addSession(username);

  res.cookie("sid", sid);
  res.json({ username });
};

authController.endSession = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
};

export default authController;
