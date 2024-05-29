import express, { Request, Response } from "express";
import { Playlist } from "../models/playlists";
import playlists from "../services/playlist-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  playlists
    .index()
    .then((list: Playlist[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id/:owner", (req: Request, res: Response) => {
  const { id, owner } = req.params;

  playlists
    .get(id, owner)
    .then((playlist: Playlist | undefined) => {
      if (!playlist) throw "Not found";
      else res.json(playlist);
    })
    .catch((err) => res.status(404).end());
});

export default router;
