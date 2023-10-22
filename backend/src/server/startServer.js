import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import accessEnv from "#root/helpers/accessEnv";
import debugInfo from "#root/middleware/debugInfo";

import articleRouter from "#root/server/routes/articles";
import commentRouter from "#root/server/routes/comments";
import userRouter from "#root/server/routes/users";
import tagRouter from "#root/server/routes/tags";

const PORT = accessEnv("PORT", 8101);
const NODE_ENV = accessEnv("NODE_ENV", "development");
const DEBUG_MODE = accessEnv("DEBUG_MODE", "true");
const VERBOSE_LOGGING = accessEnv("VERBOSE_LOGGING", "true");

const app = express();

//middlewares
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

app.use(helmet());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (DEBUG_MODE === "true") {
  app.use(debugInfo);
}

if (VERBOSE_LOGGING === "true") {
  app.use(morgan(":method :url :status :response-time ms [:date]"));
}

app.use("/api/articles", articleRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);
app.use("/api/tags", tagRouter);

if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`backend listening on port ${PORT}`);
  });
}

export default app;
