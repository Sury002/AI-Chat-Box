document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-message");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
  
    async function getBotResponse(userMessage) {
      const apiKey = "//API key from openrouter";
    
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 100,
          }),
        });
    
        const data = await response.json();
    
        console.log("API response:", data);
    
        if (data.error) {
          console.error("API Error:", data.error);
          return `Error: ${data.error.message || "An unknown error occurred."}`;
        }
    
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        } else {
          console.error("Unexpected response format:", data);
          return "Sorry, I couldn't understand the response from the AI.";
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Something went wrong talking to the AI.";
      }
    }
    
  
    function addMessage(message, isUser = false) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  
      const messageText = document.createElement("p");
      messageText.textContent = message;
      messageDiv.appendChild(messageText);
  
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        addMessage(message, true);
        userInput.value = "";
  
        setTimeout(async () => {
          const botResponse = await getBotResponse(message);
          addMessage(botResponse);
        }, 500);
      }
    }
  
    sendButton.addEventListener("click", sendMessage);
  
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  });
