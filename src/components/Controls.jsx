function Controls({ onLogout }) {
  return (
    <div className="auth-control">
      <button onClick={onLogout} className="logout-btn btn">
        Logout
      </button>
    </div>
  );
}

export default Controls;
