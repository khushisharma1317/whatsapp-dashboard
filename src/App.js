import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  // 🔵 Fetch dashboard messages
  useEffect(() => {
    fetch("http://localhost:8000/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // 🟣 Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_APP_ID",
        cookie: true,
        xfbml: true,
        version: "v18.0"
      });
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

const launchSignup = () => {
  window.FB.login(function (response) {
    if (response.authResponse) {
      console.log("Embedded Signup Success:", response);

      const code = response.authResponse.code;

      // 🔴 SEND TO BACKEND
      fetch("http://localhost:8000/signup-data", 
 {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });
    }
  }, {
    config_id: "943904021645592",
    response_type: "code"
  });
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>WhatsApp Dashboard</h2>

      {/* 🟢 CONNECT BUTTON */}
      <button onClick={launchSignup}>
        Connect WhatsApp
      </button>

      {/* 🔵 Messages */}
      <div style={{ border: "1px solid gray", height: "300px", overflow: "auto", marginTop: "20px" }}>
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
