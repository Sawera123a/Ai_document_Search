// import { useState, useRef, useEffect } from "react";
// import API from "../api";

// export default function ChatBox() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const chatEndRef = useRef(null);

//   const ask = async () => {
//     if (!input.trim()) return;

//     // Add user question
//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);

//     try {
//       const res = await API.post("/chat/", { question: input });
//       const answer = res.data.answer || JSON.stringify(res.data);

//       // Add bot answer
//       setMessages([...newMessages, { sender: "bot", text: answer }]);
//     } catch (err) {
//       setMessages([...newMessages, { sender: "bot", text: "⚠️ Error fetching reply" }]);
//     }

//     setInput("");
//   };

//   // Auto-scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         maxWidth: "600px",
//         margin: "0 auto",
//         border: "1px solid #ddd",
//         borderRadius: "12px",
//         display: "flex",
//         flexDirection: "column",
//         height: "400px",
//       }}
//     >
//       {/* Chat Messages */}
//       <div
//         style={{
//           flex: 1,
//           padding: "15px",
//           overflowY: "auto",
//           background: "#f9f9f9",
//           borderTopLeftRadius: "12px",
//           borderTopRightRadius: "12px",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: "flex",
//               justifyContent: msg.sender === "user" ? "flex-start" : "flex-end",
//               marginBottom: "10px",
//             }}
//           >
//             <div
//               style={{
//                 background: msg.sender === "user" ? "#e0e0e0" : "#007bff",
//                 color: msg.sender === "user" ? "#000" : "#fff",
//                 padding: "10px 14px",
//                 borderRadius: "15px",
//                 maxWidth: "60%",
//                 wordWrap: "break-word",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input Box at Bottom */}
//       <div
//         style={{
//           display: "flex",
//           padding: "10px",
//           borderTop: "1px solid #ddd",
//           background: "#fff",
//           borderBottomLeftRadius: "12px",
//           borderBottomRightRadius: "12px",
//         }}
//       >
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask a question..."
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "20px",
//             border: "1px solid #ccc",
//             outline: "none",
//           }}
//         />
//         <button
//           onClick={ask}
//           style={{
//             marginLeft: "10px",
//             padding: "10px 16px",
//             borderRadius: "20px",
//             border: "none",
//             background: "#007bff",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Ask
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import API from "../api";

// export default function ChatBox({ isEnabled }) {
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");

//   const handleAsk = async () => {
//     const res = await API.post("/chat/", { question: query });
//     setResponse(res.data.answer);
//   };

//   return (
//     <div style={{ borderTop: "1px solid #ddd", paddingTop: "20px" }}>
//       <h3>💬 Ask a Question</h3>
//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder={
//             isEnabled
//               ? "Ask a question about your uploaded document..."
//               : "Please upload a file first"
//           }
//           disabled={!isEnabled}
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             backgroundColor: isEnabled ? "white" : "#f1f1f1",
//           }}
//         />
//         <button
//           onClick={handleAsk}
//           disabled={!isEnabled}
//           style={{
//             background: isEnabled ? "#007bff" : "#888",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             padding: "10px 16px",
//             cursor: isEnabled ? "pointer" : "not-allowed",
//           }}
//         >
//           Ask
//         </button>
//       </div>

//       {response && (
//         <div
//           style={{
//             marginTop: "15px",
//             background: "#e8f0fe",
//             padding: "12px",
//             borderRadius: "8px",
//           }}
//         >
//           {response}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import API from "../api";

// export default function ChatBox({ isEnabled }) {
//   const [messages, setMessages] = useState([]);
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAsk = async () => {
//     if (!query.trim() || !isEnabled) return;

//     // User message
//     const userMsg = { sender: "user", text: query };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);

//     try {
//       const res = await API.post("/chat/", { question: query });
//       const botMsg = { sender: "bot", text: res.data.answer || "No answer found." };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       console.error(err);
//       const botMsg = { sender: "bot", text: "❌ Error fetching answer." };
//       setMessages((prev) => [...prev, botMsg]);
//     }

//     setLoading(false);
//     setQuery("");
//   };

//   return (
//     <div
//       style={{
//         borderTop: "1px solid #ddd",
//         paddingTop: "20px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "15px",
//       }}
//     >
//       <h3>💬 Ask a Question</h3>

//       {/* Chat Area */}
//       <div
//         style={{
//           height: "400px",
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           borderRadius: "10px",
//           padding: "10px",
//           background: "#f9f9f9",
//           display: "flex",
//           flexDirection: "column",
//           gap: "10px",
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               alignSelf: msg.sender === "user" ? "flex-start" : "flex-end",
//               background: msg.sender === "user" ? "#007bff" : "#e8f0fe",
//               color: msg.sender === "user" ? "#fff" : "#000",
//               padding: "10px 14px",
//               borderRadius: "15px",
//               maxWidth: "75%",
//               wordWrap: "break-word",
//             }}
//           >
//             {msg.text}
//           </div>
//         ))}
//         {loading && <p style={{ textAlign: "center" }}>⏳ Thinking...</p>}
//       </div>

//       {/* Input Section */}
//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder={
//             isEnabled
//               ? "Ask something about your uploaded document..."
//               : "Please upload a file first"
//           }
//           disabled={!isEnabled}
//           style={{
//             flex: 1,
//             padding: "10px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             backgroundColor: isEnabled ? "white" : "#f1f1f1",
//           }}
//           onKeyDown={(e) => e.key === "Enter" && handleAsk()}
//         />
//         <button
//           onClick={handleAsk}
//           disabled={!isEnabled || loading}
//           style={{
//             background: isEnabled ? "#007bff" : "#888",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             padding: "10px 16px",
//             cursor: isEnabled ? "pointer" : "not-allowed",
//           }}
//         >
//           {loading ? "..." : "Ask"}
//         </button>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import API from "../api";

export default function ChatBox({ isEnabled, darkMode }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMsg = { sender: "user", text: query };
    setMessages([...messages, userMsg]);

    const res = await API.post("/chat/", { question: query });
    const aiMsg = { sender: "ai", text: res.data.answer || "No response." };

    setMessages((prev) => [...prev, aiMsg]);
    setQuery("");
  };

  const clearChat = () => setMessages([]);

  return (
    <div>
      <h3 style={{ marginTop: "10px" }}>💬 Ask a Question</h3>

      <div
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          background: darkMode ? "#2a2a2a" : "#f1f1f1",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                background:
                  msg.sender === "user"
                    ? (darkMode ? "#3d5afe" : "#007bff")
                    : (darkMode ? "#333" : "#e8f0fe"),
                color: msg.sender === "user" ? "white" : darkMode ? "#ddd" : "black",
                padding: "8px 12px", 
                borderRadius: "10px",
                display: "inline-block",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isEnabled
              ? "Ask a question about your uploaded document..."
              : "Please upload a file first"
          }
          disabled={!isEnabled}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: isEnabled
              ? darkMode
              ? "#333"
              : "white"
              : darkMode
              ? "#222"
              : "#eee",
            color: darkMode ? "#fff" : "#000",
            minWidth: "60%",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={!isEnabled}
          style={{
            background: isEnabled ? "#28a745" : "#888",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 16px",
            cursor: isEnabled ? "pointer" : "not-allowed",
            flex: "1 1 auto",
          }}
        >
          Ask
        </button>
        <button
          onClick={clearChat}
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 16px",
            cursor: "pointer",
            flex: "1 1 auto",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}