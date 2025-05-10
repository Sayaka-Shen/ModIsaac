/* eslint-disable complete/complete-sentences-jsdoc */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { CoinSubType } from "isaac-typescript-definitions";
import type { CollectibleType } from "isaac-typescript-definitions";
import { spawnCoin  } from "isaacscript-common";

// Variable par défaut pour le script fonctionne
const CurseOfTheHangedManCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Hanged Man");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * @param CoinInterface = C'est une interface qui gère une entité et un timer (ça lie un timer à son entité)
  * @param spawnedCoins = Un tableau de type CoinInterface donc un tableau avec deux valeurs dans chaque case (entité et timer)
  * @param lastTimeLostCoin = On enregistre la dernière fois qu'un joueur a perdu un coin
  * @param coinLossInterval = L'interval à laquelle on veut que le joueur perdre des pièces (genre toute les 1 minutes)
  * @param spawnCoinLifeTime = Le temps de vie d'un coin spawn à la mort d'un ennemi (= 3 sec ici)
**/
interface CoinInterface { entity: Entity; timer: int; }
const spawnedCoins: CoinInterface[] = [];
let lastTimeLostCoin: int = 0;
const coinLossInterval: int = 30 * 30; // 30 = 1 sec / 30 * 30 = 900 frames donc 30 sec
const spawnCoinLifetime: float = 90; // 3 sec = 90 frames / 1 sec = 30 frames


/**
  * Appartient à l'item Curse Of The Hanged Man.
  *
  * S'exécute à chaque fois qu'un ennemi meurt.
  *
  * Permet de faire spawn un coin à chaque fois qu'un ennemi meurt.
*/
export function SpawnCoinOnNPCDeath(npcEntity: EntityNPC): void
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


/**
  * Appartient à l'item Curse Of The Hanged Man.
  *
  * S'éxécute à chaque Update.
  *
  * Elle gère le fait que les coins spawn après la mort d'ennemi despawn après 3 sec.
  * Elle gère aussi le fait que toute les 30 sec le joueur perd un coin parmi tous ces coins.
*/
export function LoseCoin(): void
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