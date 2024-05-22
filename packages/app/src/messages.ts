// @ts-ignore
import { Profile } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: Profile; }]
  | ["profile/select", { userid: string; }];
