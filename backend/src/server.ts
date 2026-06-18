import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Backend is running" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
