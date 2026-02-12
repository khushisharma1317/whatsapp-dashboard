import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);

  // Fetch messages
  useEffect(() => {
    fetch("https://whatsapp-webhook-1-8ceb.onrender.com/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // Load FB SDK correctly
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1677000596794817", // 👈 YOUR APP ID
        cookie: true,
        xfbml: true,
        version: "v18.0"
      });

      setSdkReady(true);
      console.log("FB SDK READY ✅");
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Launch Embedded Signup
  const launchSignup = () => {
    if (!sdkReady) {
      alert("SDK not loaded yet 😭");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Signup success 🔥", response);
        } else {
          console.log("User cancelled");
        }
      },
      {
        config_id: "943904021645592", // 👈 your config id
        response_type: "code"
      }
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Dashboard</h2>

      <button onClick={launchSignup}>
        Connect WhatsApp
      </button>

      <div style={{ border: "1px solid gray", height: "300px", overflow: "auto", marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <div key={index}>{JSON.stringify(msg)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
