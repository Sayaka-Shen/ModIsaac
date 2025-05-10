import { upgradeMod } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";
import { RegisterCallbacks } from "./callbackManager";

export function main(): void {
  const modVanilla: Mod = RegisterMod("mo-curses", 1);
  const mod: ModUpgraded = upgradeMod(modVanilla);

  RegisterCallbacks(mod);
}
