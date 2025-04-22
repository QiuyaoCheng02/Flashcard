import { useState } from "react";
import { PAGE } from "../constants";
import "./LoginPage.css";

function RegsiterPage({ onRegister, dispatch }) {
  const [RegisterName, setLoginName] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (RegisterName) {
      const trimmedName = RegisterName.trim();
      onRegister(trimmedName);
    }
  }

  return (
    <div className="register-container">
      <h2>Please Enter a Username to Sign Up</h2>

      <form
        className="register-form"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <label htmlFor="username-input">Username:</label>
        <input
          value={RegisterName}
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

      <button
        type="button"
        className="to-login-btn btn"
        onClick={() => dispatch({ type: "toLoginPage" })}
      >
        Already Have an Account?
      </button>
    </div>
  );
}

export default RegsiterPage;
