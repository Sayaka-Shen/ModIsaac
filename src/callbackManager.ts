/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable complete/complete-sentences-line-comments */

import type { CacheFlag, DamageFlag, LevelStage, StageType   } from "isaac-typescript-definitions";
import { ModCallback   } from "isaac-typescript-definitions";
import { ModCallbackCustom  } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";

import { IncreaseIsaacDamage, IncreaseIsaacDamageTaken, WombIncreaseDamageTaken } from "./items/curseOfDeath";
import { LoseRandomItem } from "./items/curseOfTheFool";

/* Scripts qui gère les callbacks et l'appel de fonction au callbacks */


/* Gère les événements lorsque le joueur prend des damages */
function OnPlayerTakeDMG(entity: EntityPlayer, amount: float, flags: BitFlags<DamageFlag>, source: EntityRef, countdown: int)
{
  // From Curse Of Death
  const areDamageDoubled: boolean = IncreaseIsaacDamageTaken(entity, amount, flags, source, countdown);

  // From Curse Of The Fool
  const isItemLost: boolean = LoseRandomItem();

  return isItemLost && areDamageDoubled;
}

/* Gère les événements de modification de stats du joueur */
function EvaluateCache(player: EntityPlayer, cacheFlag: CacheFlag)
{
  // From Curse Of Death
  IncreaseIsaacDamage(player, cacheFlag);
}

/* Gère les événements lorsqu'on rentre dans un nouveau level */
function OnNewEntryLevel(stage: LevelStage, _stageType: StageType)
{
  // From Curse Of Death
  WombIncreaseDamageTaken(stage)
}

/* Gère les événements à chaque Update */
function OnUpdate()
{

}


export function RegisterCallbacks(mod: ModUpgraded): void
{
  mod.AddCallbackCustom(ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, OnPlayerTakeDMG);
  mod.AddCallback(ModCallback.EVALUATE_CACHE, EvaluateCache)
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_LEVEL_REORDERED, OnNewEntryLevel);
  mod.AddCallback(ModCallback.POST_UPDATE, OnUpdate);
}