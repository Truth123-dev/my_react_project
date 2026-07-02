import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/ai.routes";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.use(errorMiddleware);

export default app;
