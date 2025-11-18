import { useState, useEffect } from "react";
import FileUpload from "./components/UploadForm";
import ChatBox from "./components/ChatBox";

export default function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#fff" : "#333",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
    transition: "0.3s ease-in-out",
  };

  return (
    <div style={themeStyles}>
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: darkMode ? "#1e1e1e" : "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: darkMode
            ? "0 6px 25px rgba(255,255,255,0.1)"
            : "0 6px 25px rgba(0,0,0,0.15)",
          textAlign: "center",
          transition: "0.3s",
        }}
      >
        <h1
          style={{
            marginBottom: "15px",
            fontSize: isMobile ? "1.4rem" : "1.9rem",
            fontWeight: "600",
            color: darkMode ? "#ffffff" : "#222222",
            transition: "color 0.3s ease",
          }}
        >
          ⚡ AI Document Search
        </h1>

        <button
          onClick={toggleTheme}
          style={{
            background: darkMode ? "#444" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            marginBottom: "25px",
            cursor: "pointer",
            fontSize: "0.95rem",
            transition: "0.2s",
          }}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Components inside center card */}
        <FileUpload
          onUploadSuccess={() => setFileUploaded(true)}
          darkMode={darkMode}
        />
        <ChatBox isEnabled={fileUploaded} darkMode={darkMode} />
      </div>
    </div>
  );
}
