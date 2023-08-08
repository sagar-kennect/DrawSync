<template>
  <div>
    <h2>Welcome, {{ username }}!</h2>
    <div class="chat">
      <div v-for="message in messages" :key="message.id">
        <strong>{{ message.username }}:</strong> {{ message.text }}
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
    />
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      username: "",
      newMessage: "",
      messages: [],
      socket: null,
    };
  },
  mounted() {
    this.username = prompt("Enter your name:");
    this.socket = io("https://6scrck-3001.csb.app");

    this.socket.on("message", (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      const message = {
        id: new Date().getTime(),
        username: this.username,
        text: this.newMessage,
      };

      this.socket.emit("message", message);
      this.messages.push(message);
      this.newMessage = "";
    },
  },
};
</script>

<style>
.chat {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  max-height: 300px;
  overflow-y: scroll;
}
</style>
