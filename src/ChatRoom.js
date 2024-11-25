import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";

function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // Handle sending a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      setError("Message cannot be empty.");
      return;
    }
    setError("");

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp(),
        user: user.email,
      });
      setNewMessage(""); // Clear the input field after sending
    } catch (err) {
      setError("Failed to send the message. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome, {user.email}!</h1>

      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Messages Container */}
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <p key={msg.id} style={{ margin: "5px 0" }}>
              <strong style={{ color: "#007bff" }}>{msg.user}:</strong> {msg.text}
            </p>
          ))
        )}
      </div>

      {/* Input for new message */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
