/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import GlobalErrorHandler from "./app/middlewares/GlobalErrorHandler";
import NotFound from "./app/middlewares/NotFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["localhost:3000"] }));

// all application route here
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Mini ERP");
});

// global error handler
app.use(GlobalErrorHandler);
app.use(NotFound);

export default app;
