/* eslint-disable complete/format-jsdoc-comments */

import type { CacheFlag, DamageFlag, LevelStage, StageType   } from "isaac-typescript-definitions";
import { ModCallback   } from "isaac-typescript-definitions";
import { ModCallbackCustom  } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";

import { IncreaseIsaacDamage, IncreaseIsaacDamageTaken, WombIncreaseDamageTaken } from "./items/curseOfDeath";
import { LoseRandomItem } from "./items/curseOfTheFool";
import { SpawnTrapdoor, TeleportIsaac } from "./items/curseOfTheDevil";
import { LoseCoin, SpawnCoinOnNPCDeath } from "./items/curseOfTheHangedMan";
import { AddBlindEffect } from "./items/curseOfTheWorld";
import { AttractTears } from "./items/curseOfTheMagician";
import { LinkStats, StatsUpgrade } from "./items/curseOfTheEmpress";
import { GiveIsaacSkeletonHeart } from "./items/curseOfTheHierophant";

/**
 * Cette fonction permet d'exécuter tout les callbacks du MOD.
 *
 * Normal Callback: Les callbacks de l'API d'Isaac de base.
 * Custom Callback: Les callbacks d'IsaacScript qui m'aide à appeler des événements en plus.
*/
export function RegisterCallbacks(mod: ModUpgraded): void
{
  // Normal Callbacks
  mod.AddCallback(ModCallback.POST_UPDATE, OnUpdate);
  mod.AddCallback(ModCallback.EVALUATE_CACHE, EvaluateCache)
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, OnTearUpdate);

  // Custom Callbacks
  mod.AddCallbackCustom(ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, OnPlayerTakeDMGPlayer);
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_LEVEL_REORDERED, OnNewEntryLevel);
  mod.AddCallbackCustom(ModCallbackCustom.POST_NPC_DEATH_FILTER, OnNpcDeathFilter);
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED, OnPlayerCollectibleAdded);
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_ROOM_REORDERED, OnNewRoom);
}


/**
 * Gère les événements lorsque le joueur prend des dégats.
 *
 * Les fonctions peuvent venir d'item différents.
*/
function OnPlayerTakeDMGPlayer(entity: EntityPlayer, amount: float, flags: BitFlags<DamageFlag>, source: EntityRef, countdown: int)
{
  /* From Curse Of Death */
  IncreaseIsaacDamageTaken(entity, amount, flags, source, countdown);

  /* From Curse Of The Fool */
  LoseRandomItem();

  return true;
}


/**
  * Gère les événements de modification de stats du joueur.
  *
  * Les fonctions peuvent venir d'item différents.
*/
function EvaluateCache(player: EntityPlayer, cacheFlag: CacheFlag)
{
  IncreaseIsaacDamage(player, cacheFlag);

  LinkStats(player, cacheFlag);
}


/**
 * Gère les événements lorsqu'on rentre dans un nouveau level.
 *
 * Les fonctions peuvent venir d'item différents.
*/
function OnNewEntryLevel(stage: LevelStage, _stageType: StageType)
{
  WombIncreaseDamageTaken(stage)

  SpawnTrapdoor();

  StatsUpgrade();
}


/**
 * Gère les événements à chaque Update (boucle du jeu).
 *
 * Les fonctions peuvent venir d'item différents.
*/
function OnUpdate()
{
  TeleportIsaac();

  LoseCoin();
}


/**
 * Gère les événements lorsqu'un NPC meurt.
 *
 * Les fonctions peuvent venir d'item différents.
*/
function OnNpcDeathFilter(npcEntity: EntityNPC)
{
  SpawnCoinOnNPCDeath(npcEntity);
}


/**
  * Gère les événements lorsqu'un joueur vient d'obtenir un Collectible item.
  *
  * Les fonctions peuvent venir d'item différents.
*/
function OnPlayerCollectibleAdded()
{
  AddBlindEffect();

  GiveIsaacSkeletonHeart();
}


/**
 * Gère les événements lorsque des tears sont tiré.
 *
 * Les fonctions peuvent venir d'item différents.
*/
function OnTearUpdate(tear: EntityTear)
{
  AttractTears(tear);
}


/**
  * Gère les événements lorsque le joueur rentre dans une nouvelle room.
  *
  * Les fonctions peuvent venir d'item différents.
*/
function OnNewRoom()
{
  AddBlindEffect();
}

