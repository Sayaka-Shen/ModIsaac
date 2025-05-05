import { ModCallback } from "isaac-typescript-definitions";
import { logAndPrint } from "isaacscript-common";
import { name } from "../package.json";

export function main(): void {
  const mod = RegisterMod(name, 1);

  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit);
}

function postPlayerInit() {
  logAndPrint("Test");
}
