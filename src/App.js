import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  const BACKEND = process.env.REACT_APP_BACKEND_URL;

  // 🔵 Fetch messages
  useEffect(() => {
    if (!BACKEND) return;

    fetch(`${BACKEND}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.log("Fetch error:", err));
  }, [BACKEND]);

  // 🟣 Read CODE from URL after redirect
  useEffect(() => {
    if (!BACKEND) return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      console.log("CODE FROM URL 🔥:", code);

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
  }, [BACKEND]);

  // 🟢 Load FB SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1677000596794817",
        cookie: true,
        xfbml: true,
        version: "v18.0"
      });

      console.log("FB SDK READY ✅");
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // 🔴 Launch Embedded Signup
  const launchSignup = () => {
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
