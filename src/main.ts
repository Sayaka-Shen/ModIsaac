
import { upgradeMod } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";
import { CurseOfTheDevil } from "./items/curseOfTheDevil";
import { CurseOfTheHangedMan } from "./items/curseOfTheHangedMan";
import { CurseOfTheWorld } from "./items/curseOfTheWorld";
import { CurseOfTheMagician } from "./items/curseOfTheMagician";
import { CurseOfTheEmpress } from "./items/curseOfTheEmpress";
import { RegisterCallbacks } from "./callbackManager";

export function main(): void {
  const modVanilla: Mod = RegisterMod("mo-curses", 1);
  const mod: ModUpgraded = upgradeMod(modVanilla);

  RegisterCallbacks(mod);

  /* Ajoute ces items à la nouvelle structure */
  CurseOfTheDevil(mod);
  CurseOfTheHangedMan(mod);
  CurseOfTheWorld(mod);
  CurseOfTheMagician(mod);
  CurseOfTheEmpress(mod);
}
