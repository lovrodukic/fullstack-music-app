import express, { Request, Response } from "express";
import auth, { authenticateUser } from "./routes/auth";
import profile from "./routes/profiles";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("Cluster0");

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/profiles", authenticateUser, profile);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
