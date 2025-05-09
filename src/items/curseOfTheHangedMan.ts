/* eslint-disable complete/format-line-comments */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { CoinSubType, ModCallback  } from "isaac-typescript-definitions";
import type {CollectibleType} from "isaac-typescript-definitions";
import { ModCallbackCustom, spawnCoin  } from "isaacscript-common";
import type {ModUpgraded} from "isaacscript-common";

const CurseOfTheHangedManCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Hanged Man");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

// Array qui stocke les pièces spawn après la mort d'un ennemi, l'interface lie une entity à son timer
interface CoinInterface { entity: Entity; timer: int; }
const spawnedCoins: CoinInterface[] = [];

let lastTimeLostCoin: int = 0;
const coinLossInterval: int = 30 * 30; // 30 is 1 sec donc 30 sec

// le temps que l'item spawn met à disparaitre
const spawnCoinLifetime: float = 90; // 3 sec = 90 frames / 1 sec = 30 frames

export function CurseOfTheHangedMan(mod: ModUpgraded): void
{
  mod.AddCallbackCustom(ModCallbackCustom.POST_NPC_DEATH_FILTER, SpawnCoinOnNPCDeath);
  mod.AddCallback(ModCallback.POST_UPDATE, LoseCoin);
}

function SpawnCoinOnNPCDeath(npcEntity: EntityNPC)
{
  if(playerInstance?.HasCollectible(CurseOfTheHangedManCollectible))
  {
    if(npcEntity?.IsEnemy() && npcEntity?.IsDead())
    {
      const coin: Entity = spawnCoin(CoinSubType.PENNY, npcEntity?.Position);
      spawnedCoins?.push({entity: coin, timer: spawnCoinLifetime});
    }
  }
}

function LoseCoin()
{
  const frameCount = Isaac.GetFrameCount();

  if(playerInstance?.HasCollectible(CurseOfTheHangedManCollectible))
  {
    // Gère la suppression du coin spawn dans après la mort d'un ennemi toute les 3 sec
    for (let i = spawnedCoins.length - 1; i >= 0; i--) {
      const coin = spawnedCoins[i];

      if(coin !== undefined)
      {
        coin.timer--;

        if(coin.timer <= 0)
        {
          coin?.entity.Remove();
          spawnedCoins.splice(i, 1);
        }
      }
    }

    // Gère la suppression d'un coin toute les 30 sec
    if(frameCount - lastTimeLostCoin >= coinLossInterval)
    {
      if(playerInstance?.GetNumCoins() > 0)
      {
        playerInstance?.AddCoins(-1);
      }

      lastTimeLostCoin = frameCount;
    }
  }
}