"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var playlist_svc_exports = {};
__export(playlist_svc_exports, {
  default: () => playlist_svc_default
});
module.exports = __toCommonJS(playlist_svc_exports);
var import_mongoose = require("mongoose");
const playlistSchema = new import_mongoose.Schema(
  {
    playlistid: {
      type: String,
      trim: true
    },
    owner: {
      type: String,
      trim: true
    },
    songs: [{ title: String, artist: String }]
  },
  { collection: "playlist_collection" }
);
const PlaylistModel = (0, import_mongoose.model)(
  "Playlist",
  playlistSchema
);
function index() {
  return PlaylistModel.find();
}
function get(playlistid) {
  return PlaylistModel.find({ playlistid }).then((list) => list[0]).catch((err) => {
    throw `Playlist "${playlistid}" Not Found`;
  });
}
var playlist_svc_default = {
  index,
  get,
  Schema: playlistSchema
};
