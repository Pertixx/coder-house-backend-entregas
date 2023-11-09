let chatBox = document.getElementById("chatBox");
let socket = io();

Swal.fire({
  title: "Authentication",
  input: "text",
  text: "Set username for the chat",
}).then((response) => {
  user = response.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});
