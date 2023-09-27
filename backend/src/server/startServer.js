import cors from "cors";
import express from "express";
import morgan from "morgan";

import accessEnv from "#root/helpers/accessEnv";
import articleRouter from "#root/server/routes/articles";
import userRouter from "#root/server/routes/users";
import debugInfo from "#root/middleware/debugInfo";

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
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});
