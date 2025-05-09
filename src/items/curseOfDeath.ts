/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable unicorn/no-lonely-if */

import type { CollectibleType, DamageFlag} from "isaac-typescript-definitions";
import { LevelStage, CacheFlag } from "isaac-typescript-definitions";

const CurseOfDeathCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of Death");
const playerInstance: EntityPlayer = Isaac.GetPlayer(0);

// Variable qui gère les damage taken
let hasTakeDamage: boolean = false;
let doubleDamageTaken: int = 0;

// Incrémente/double les dégats qu'isaac prend
export function IncreaseIsaacDamageTaken(entity: EntityPlayer, amount: float, flags: BitFlags<DamageFlag>, source: EntityRef, countdown: int): boolean
{
  if(playerInstance?.HasCollectible(CurseOfDeathCollectible))
  {
    if(!hasTakeDamage)
    {
      hasTakeDamage = true;

      doubleDamageTaken = amount * 2;
      entity.TakeDamage(doubleDamageTaken, flags, source, countdown);

      hasTakeDamage = false;

      return false;
    }
  }

  return true;
}

// Incrémente/double les degats qu'isaac fait
export function IncreaseIsaacDamage(player: EntityPlayer, cacheFlag: CacheFlag): void
{
  if(playerInstance?.HasCollectible(CurseOfDeathCollectible))
  {
    if(cacheFlag === CacheFlag.DAMAGE)
    {
      player.Damage *= 2;
    }
  }
}

// In womb double again the current damage taen by isaac
export function WombIncreaseDamageTaken(stage: LevelStage): void
{
  if(playerInstance?.HasCollectible(CurseOfDeathCollectible))
  {
    if(stage >= LevelStage.WOMB_1)
    {
      doubleDamageTaken *= 2;
    }
  }
}
