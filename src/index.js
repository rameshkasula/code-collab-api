// express api
import mongoose from "mongoose";
import Express from "express";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

// dotenv
dotenv.config();
const app = Express();
const server = http.createServer(app);

const PORT = process.env.PORT || 9014;

app.use(Express.json());
app.use(cors());

// routes
app.use("/api/v1/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log("user joined room", data);
  });
});

// database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
