import express from "express";
import testRouter from "./routes/testRouter";
import authRouter from "./routes/authRouter";

const app = express();
const port = process.env.PORT || 8000;

app.use(authRouter);

app.use(testRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
