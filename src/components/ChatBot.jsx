// ChatBot.jsx (Bonus)
import React, { useState } from "react";
import axios from "axios";
export default function ChatBot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post("/api/vibes/chat", { message: input });
    setChat([...chat, { user: input }, { ai: res.data.reply }]);
    setInput("");
  };

  return (
    <div className="p-4 border-t">
      <div className="h-64 overflow-y-scroll">
        {chat.map((msg, i) => (
          <p key={i} className={msg.user ? "text-right" : "text-left"}>
            {msg.user || msg.ai}
          </p>
        ))}
      </div>
      <input
        className="mt-2 w-full border p-2 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
}
