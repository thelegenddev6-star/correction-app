import { useState } from "react";
import TextInput from "./components/TextInput.jsx";
import History from "./components/History.jsx";
import photo from "./assets/L5.jpg";

function App() {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 5));
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "48px 24px",
        display: "flex",
        gap: "48px",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1, maxWidth: "640px" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            paddingBottom: "20px",
            borderBottom: "1px solid #e4ddd0",
            marginBottom: "32px",
          }}
        >
          <img
            src={photo}
            alt="Photo de profil"
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h1 style={{ fontSize: "22px" }}>Correcteur de texte</h1>
            <p
              style={{ margin: "2px 0 0", color: "#6b6458", fontSize: "13px" }}
            >
              Par [LEGEND DEV]
            </p>
          </div>
        </header>

        <TextInput onAction={addToHistory} />
      </div>

      <History items={history} />
    </div>
  );
}

export default App;
