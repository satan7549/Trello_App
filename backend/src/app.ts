import express, { Request, Response, Application } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import userRoutes from "./routes/user.routes";
import { isUserAuthenticated } from "./middleware/user.auth";
import taskRouter from "./routes/task.routes";
import "./config/passportConfig";

const app: Application = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// Import All Routes Below
app.use("/user", userRoutes);
app.use(isUserAuthenticated);
app.use("/task", taskRouter);

export default app;
