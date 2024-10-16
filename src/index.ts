import express from "express";
import authRouter from "./routes/authRouter";
import AppDataSource from "./data-source";
import { connectRedis } from "./redisClient";
import { authenticateUser } from "./middleWare/authenticateUser";
import bodyParser from "body-parser";

const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// JSON 요청의 최대 크기를 50mb로 설정
app.use(bodyParser.json({ limit: "50mb" }));

// URL-encoded 요청의 최대 크기를 50mb로 설정
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// 데이터베이스 연결
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

connectRedis()
  .then(() => {
    console.log("Redis client connected!");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

app.use(cors());

app.get("/protected", authenticateUser, (req, res) => {
  res.json(req.user);
});

app.use(express.json());

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
