/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable complete/complete-sentences-jsdoc */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { CollectibleType } from "isaac-typescript-definitions";
import { getRandomFloat, getRandomInt, logAndPrint, newRNG, spawnCollectible } from "isaacscript-common";

const CurseOfTheFoolCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Fool");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
 * @param loseItemChance = 33% de chance de perdre un item lorsqu'Isaac est touché
**/
const loseItemChance: float = 0.33;
const minCollectibleId: int = 1;
const maxCollectibleId: int = 740;

// Perds un item random entre 0 et le nombre d'item qu'Isaac à sur lui
export function LoseRandomItem(): boolean
{
  const RNG: RNG = newRNG();

  if(playerInstance?.HasCollectible(CurseOfTheFoolCollectible) && getRandomFloat(0, 1, RNG) < loseItemChance)
  {
    const playerCollectibles: CollectibleType[] = [];
    logAndPrint("Oui");

    for (let indexCollectibles = minCollectibleId; indexCollectibles < maxCollectibleId; indexCollectibles++)
    {
      if(playerInstance.HasCollectible(indexCollectibles as CollectibleType))
      {
        playerCollectibles.push(indexCollectibles as CollectibleType);
      }
    }

    if (playerCollectibles.length > 0)
    {
      const playerPos: Vector = playerInstance.Position;
      const chosenItem: CollectibleType | undefined = playerCollectibles[getRandomInt(1, playerCollectibles.length, RNG)];

      if (chosenItem !== undefined)
      {
        playerInstance.RemoveCollectible(chosenItem);
        spawnCollectible(chosenItem, playerPos, RNG);

        return false;
      }
    }
  }

  return true;
}

/* !! ajoute une varibale qui empêche un deuxième spawn instante genre HasSpawnedItem */