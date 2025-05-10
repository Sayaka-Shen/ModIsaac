/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable unicorn/no-lonely-if */

import type { CollectibleType, DamageFlag} from "isaac-typescript-definitions";
import { LevelStage, CacheFlag } from "isaac-typescript-definitions";

// Variable par défaut pour le script fonctionne
const CurseOfDeathCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of Death");
const playerInstance: EntityPlayer = Isaac.GetPlayer(0);

/**
  * @param hasTakeDamage Vérifie si Isaac à pris des dégats.
  * @param doubleDamageTaken Contient les doubleDamge qu'Isaac prends.
*/
let hasTakeDamage: boolean = false;
let doubleDamageTaken: int = 0;


/**
  * Appartient à l'item Curse Of Death.
  *
  * S'exécute à chaque fois qu'Isaac prend des dégats.
  *
  * On multiplie par 2 le nombre de dégats qu'Isaac aurait du prendre et on l'ajoute à doubleDamageTaken.
  * On effectue des dégats avec la fonction TakeDamage du MOD.
  *
  * Il perds 1 coeur au lieu d'1/2 de base.
  *
  * Return TRUE quand les dégats on était fait.
  * Return FALSE quand l'item n'a rien fait.
*/
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

      return true;
    }
  }

  return false;
}

/**
  * Appartient à l'item Curse Of Death.
  *
  * S'exécute à l'évaluation du cache.
  *
  * On multiplie par 2 les dégats d'Isaac.
*/
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

/**
  * Appartient à l'item Curse Of Death.
  *
  * S'exécute à chaque nouveau level.
  *
  * On multiplie à nouveau par 2 les dégats qu'Isaac prends lorsqu'il arrive au WOMB.
  * Il perds 2 coeurs au lieu d'1/2 de base.
*/
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
