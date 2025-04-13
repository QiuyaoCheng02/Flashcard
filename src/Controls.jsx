function Controls({ onLogout, onRefresh }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="refresh-btn btn">
        Refresh
      </button>
      <button onClick={onLogout} className="logout-btn btn">
        Logout
      </button>
    </div>
  );
}

export default Controls;
