/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable complete/prefer-plusplus */
/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
/* eslint-disable complete/newline-between-switch-case */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { CacheFlag  } from "isaac-typescript-definitions";
import type { CollectibleType } from "isaac-typescript-definitions";

// Variable par défaut pour le script fonctionne
const CurseOfTheEmpressCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Empress");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * @param damageUp Variable pour ajouter des dégats.
  * @param firedelayUp Variable pour ajouter des tears up.
  * @param speedUp Variable pour ajouter de la vitesse au joueur.
*/
let damageUp = 0;
let firedelayUp = 0;
let speedUp = 0;


/**
  * Appartient à l'item Curse Of The Empress.
  *
  * S'exécute lors de l'évaluation du cache.
  *
  * Cette fonction sert à ajouter aux stats du joueur les bonus.
*/
export function LinkStats(player: EntityPlayer, cacheFlags: CacheFlag): void
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


/**
  * Appartient à l'item Curse Of The Empress.
  *
  * S'exécute lors de l'entrer dans un nouveau level.
  *
  * On enlève un coeur si Isaac en a plus que 1 et on ajoute les stats si c'est le cas.
  * On les ajoute au cache flags comme dans le xml puis evaluate items trigger le EVALUATE_CACHE callback.
*/
export function StatsUpgrade(): void
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