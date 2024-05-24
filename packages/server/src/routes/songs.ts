import express, { Request, Response } from "express";
import { Song } from "../models/playlists";
import songs from "../services/song-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  songs
    .index()
    .then((list: Song[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:title/:artist", (req: Request, res: Response) => {
  const { title, artist } = req.params;

  songs
    .get(title, artist)
    .then((song: Song | undefined) => {
      if (!song) throw "Not found";
      else res.json(song);
    })
    .catch((err) => res.status(404).end());
});

export default router;
