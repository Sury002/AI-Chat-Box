document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-message");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
  
   async function getBotResponse(userMessage) {
  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    return "Error talking to the AI.";
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
