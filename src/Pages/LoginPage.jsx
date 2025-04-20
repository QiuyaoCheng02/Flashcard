import { useState } from "react";
import { PAGE } from "../constants";
import "./Login.css";

function LoginPage({ onLogin, dispatch }) {
  const [loginName, setLoginName] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (loginName) {
      const trimmedName = loginName.trim();
      onLogin(trimmedName);
    }
  }

  return (
    <div className="login-container">
      <h2>Please Login or Sign Up to Start</h2>

      <form
        className="login-form"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <label htmlFor="username-input">Username:</label>
        <input
          value={loginName}
          onInput={(e) => setLoginName(e.target.value)}
          id="username-input"
          className="username-input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "toRegisterPage" })}
        >
          Create New Account
        </button>
      </form>
      <p className="hint-msg">
        <span className="star-mark">* </span> Usernames must contain only
        letters, numbers, or underscores (_), and cannot be empty or "dog".
      </p>
    </div>
  );
}

export default LoginPage;
