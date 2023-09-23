import cors from "cors";
import express from "express";

import accessEnv from "#root/helpers/accessEnv";
import articleRouter from "#root/server/routes/articles";
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

app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`backend listening on port ${PORT}`);
});
