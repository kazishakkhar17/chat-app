import React, { useState } from "react";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Validate email format
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setUser(userCredential.user))
      .catch((err) => setError(err.message));
  };

  const handleSignup = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => setUser(userCredential.user))
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {!user ? (
        <div style={{ maxWidth: "300px", margin: "0 auto", textAlign: "center" }}>
          <h1>Chat App</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              width: "48%",
              padding: "10px",
              marginRight: "4%",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            style={{
              width: "48%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <ChatRoom user={user} />
      )}
    </div>
  );
}

export default App;
