/* eslint-disable complete/prefer-plusplus */
/* eslint-disable complete/format-line-comments */
/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
/* eslint-disable complete/newline-between-switch-case */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom  } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";

const CurseOfTheEmpressCollectible = Isaac.GetItemIdByName("Curse Of The Empress");
const playerInstance = Isaac.GetPlayer();

// Track the damage, firedelay and speed
let damageUp = 0;
let firedelayUp = 0;
let speedUp = 0;

export function CurseOfTheEmpress(mod: ModUpgraded): void
{
  mod.AddCallback(ModCallback.EVALUATE_CACHE, LinkStats);
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_LEVEL_REORDERED, StatsUpgrade);
}

// We update the stats when EvaluateCache is called to add them to the stats
function LinkStats(player: EntityPlayer, cacheFlags: CacheFlag)
{
  if(playerInstance?.HasCollectible(CurseOfTheEmpressCollectible))
  {
    switch (cacheFlags)
    {
      case CacheFlag.DAMAGE:
      {
        player.Damage += damageUp;
        break;
      }
      case CacheFlag.SPEED:
      {
        player.MoveSpeed += speedUp;
        break;
      }
      case CacheFlag.FIRE_DELAY:
      {
        player.MaxFireDelay -= firedelayUp;
        break;
      }
    }
  }
}

// Chaque level on enlève un coeur si il y en a plus que 1 et on ajoute les stats si c'est le cas
// On les ajoute au cache flags comme dans le xml puis evaluate items trigger le EVALUATE_CACHE callback
function StatsUpgrade()
{
  if(playerInstance?.HasCollectible(CurseOfTheEmpressCollectible) && playerInstance?.GetMaxHearts() > 2)
  {
    playerInstance.AddMaxHearts(-2, true);

    damageUp += 1;
    firedelayUp += 0.5;
    speedUp += 0.2;

    playerInstance.AddCacheFlags(CacheFlag.DAMAGE);
    playerInstance.AddCacheFlags(CacheFlag.FIRE_DELAY);
    playerInstance.AddCacheFlags(CacheFlag.SPEED);

    playerInstance.EvaluateItems();
  }
}