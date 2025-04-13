import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
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
      <h2>Please Login to Start</h2>

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
      </form>
      <p className="hint-msg">
        <span className="star-mark">* </span> Usernames must contain only
        letters, numbers, or underscores (_), and cannot be empty or "dog".
      </p>
    </div>
  );
}

export default Login;
