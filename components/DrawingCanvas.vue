<template>
  <div>
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @touchstart="startDrawing"
      @touchmove="draw"
      @touchend="stopDrawing"
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
      userColor: this.generateRandomColor(),
    };
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
    this.adjustCanvasSize();
    window.addEventListener("resize", this.adjustCanvasSize);

    this.socket = io("https://6scrck-3001.csb.app");

    this.socket.on("path", (data) => {
      const { dataUrl, color } = data;
      if (color !== this.userColor) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          this.context.drawImage(img, 0, 0);
        };
      }
    });
  },
  methods: {
    startDrawing(event) {
      event.preventDefault(); // Prevent scrolling on touch devices
      this.drawing = true;
      const x = event.clientX || event.touches[0].clientX;
      const y = event.clientY || event.touches[0].clientY;
      this.context.beginPath();
      this.context.moveTo(x, y);
    },
    draw(event) {
      if (!this.drawing) return;
      const x = event.clientX || event.touches[0].clientX;
      const y = event.clientY || event.touches[0].clientY;
      this.context.strokeStyle = this.userColor;
      this.context.lineTo(x, y);
      this.context.stroke();
    },
    stopDrawing() {
      this.drawing = false;
      const dataUrl = this.$refs.canvas.toDataURL();
      this.socket.emit("path", { dataUrl, color: this.userColor });
    },
    adjustCanvasSize() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    },
    generateRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adjustCanvasSize);
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
