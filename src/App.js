import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);

  // 🔵 Fetch messages from backend
  useEffect(() => {
    fetch("https://whatsapp-webhook-1-8ceb.onrender.com/messages")
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  // 🟣 Read CODE from URL after Embedded Signup redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      console.log("CODE FROM URL 🔥:", code);

      fetch("https://whatsapp-webhook-1-8ceb.onrender.com/signup-data", {
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

  // 🟢 Load FB SDK correctly
  useEffect(() => {
window.FB.login(
  function (response) {
    console.log("Signup response:", response);
  },
  {
    config_id: "943904021645592",
    response_type: "code",
    override_default_response_type: true,
    redirect_uri: "https://whatsapp-dashboard-zeta.vercel.app/"
  }
);


    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
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
        config_id: "943904021645592", // 👈 your config id
        response_type: "code",
        override_default_response_type: true
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Dashboard</h2>

      <button onClick={launchSignup}>
        Connect WhatsApp
      </button>

      <div style={{
        border: "1px solid gray",
        height: "300px",
        overflow: "auto",
        marginTop: "20px"
      }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {JSON.stringify(msg)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

