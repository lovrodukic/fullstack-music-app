import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import auth, { authenticateUser } from "./routes/auth";
import profile from "./routes/profiles";
import songs from "./routes/songs";
import playlists from "./routes/playlists";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("Cluster0");

app.use(express.static(staticDir));
const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));
app.use(express.json());
app.use("/auth", auth);
app.use("/api/profiles", authenticateUser, profile);
app.use("/api/songs", authenticateUser, songs);
app.use("/api/playlists", authenticateUser, playlists);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

// SPA Routes
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
