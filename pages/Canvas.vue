<template>
  <div>
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
    ></canvas>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      drawing: false,
      context: null,
      socket: null,
    };
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
    this.socket = io("https://6scrck-3001.csb.app");

    this.socket.on("path", (dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        this.context.drawImage(img, 0, 0);
      };
    });
  },
  methods: {
    startDrawing(event) {
      this.drawing = true;
      this.context.beginPath();
      this.context.moveTo(event.clientX, event.clientY);
    },
    draw(event) {
      if (!this.drawing) return;
      this.context.lineTo(event.clientX, event.clientY);
      this.context.stroke();
    },
    stopDrawing() {
      this.drawing = false;
      this.socket.emit("path", this.$refs.canvas.toDataURL());
    },
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
}
</style>
