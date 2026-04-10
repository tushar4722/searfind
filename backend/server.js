const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

// ─── Socket.io Setup ───────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId)
    console.log(`User joined room: ${roomId}`)
  });

  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data)
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id)
  });
});

// ─── Middleware ─────────────────────────────────────────────
app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ─── Test Route ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "🚀 SearFind API is running!",
    status: "success",
    version: "1.0.0"
  })
});

// ─── API Routes ─────────────────────────────────────────────
app.use("/api/auth",        require("./src/routes/authRoutes"))
app.use("/api/jobs",        require("./src/routes/jobRoutes"))
app.use("/api/freelancers", require("./src/routes/freelancerRoutes"))
app.use("/api/courses",     require("./src/routes/learningRoutes"))
app.use("/api/users",       require("./src/routes/userRoutes"))
app.use("/api/payments",    require("./src/routes/paymentRoutes"))
app.use("/api/messages",    require("./src/routes/messageRoutes"))
app.use('/api/applications', require('./src/routes/applicationRoutes'))

// ─── 404 Handler ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`
  })
});

// ─── Error Handler ──────────────────────────────────────────
app.use(require("./src/middleware/errorMiddleware"))

// ─── Start Server ───────────────────────────────────────────
const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`✅ SearFind server running on port ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
  console.log(`📡 API URL: http://localhost:${PORT}`)
})