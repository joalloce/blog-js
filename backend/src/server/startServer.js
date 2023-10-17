import cors from "cors";
import express from "express";
import morgan from "morgan";

import accessEnv from "#root/helpers/accessEnv";
import debugInfo from "#root/middleware/debugInfo";

import articleRouter from "#root/server/routes/articles";
import commentRouter from "#root/server/routes/comments";
import userRouter from "#root/server/routes/users";

const PORT = accessEnv("PORT", 8101);

const app = express();

//middlewares
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(express.json());

app.use(debugInfo);

app.use(morgan(":method :url :status :response-time ms [:date]"));

app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});
