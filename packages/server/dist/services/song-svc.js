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
var song_svc_exports = {};
__export(song_svc_exports, {
  default: () => song_svc_default
});
module.exports = __toCommonJS(song_svc_exports);
var import_mongoose = require("mongoose");
const songSchema = new import_mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    artist: {
      type: String,
      trim: true
    }
  },
  { collection: "song_collection" }
);
const SongModel = (0, import_mongoose.model)(
  "Song",
  songSchema
);
function index() {
  return SongModel.find();
}
function get(title, artist) {
  return SongModel.find({ title, artist }).then((list) => list[0]).catch((err) => {
    throw `${title} by ${artist} Not Found`;
  });
}
var song_svc_default = {
  index,
  get,
  Schema: songSchema
};
