import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);
const BACKEND = process.env.REACT_APP_BACKEND_URL;

useEffect(() => {
  fetch(`${BACKEND}/messages`)
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(err => console.log("Fetch error:", err));
}, []);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    fetch(`${BACKEND}/signup-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => console.log("Backend response:", data))
      .catch(err => console.log("Signup API error:", err));
  }
}, []);


  // 🔴 Launch Embedded Signup
  const launchSignup = () => {
    if (!sdkReady) {
      alert("SDK not loaded yet 😭");
      return;
    }

    window.FB.login(
      function (response) {
        console.log("Signup response:", response);
      },
      {
        config_id: "943904021645592",
        response_type: "code",
        override_default_response_type: true,
        redirect_uri: "https://whatsapp-dashboard-f90h.vercel.app/"
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Dashboard</h2>

      <button onClick={launchSignup}>
        Connect WhatsApp
      </button>

      <div
        style={{
          border: "1px solid gray",
          height: "300px",
          overflow: "auto",
          marginTop: "20px"
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{JSON.stringify(msg)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
