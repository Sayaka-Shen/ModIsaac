/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { CollectibleType } from "isaac-typescript-definitions";
import { getRandomFloat, getRandomInt, newRNG, spawnCollectible } from "isaacscript-common";

// Variable par défaut pour le script fonctionne
const CurseOfTheFoolCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Fool");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * @param loseItemChance 33% de chance de perdre un item lorsqu'Isaac est touché.
  * @param mixCollectibleId Contient l'index minium de collectible dans le jeu.
  * @param maxCollectibleId Contient l'index maximum de collectible dans le jeu.
  * @param hasLostItem Check si le joueur a déjà perdu un item ou pas.
**/
const loseItemChance: float = 0.33;
const minCollectibleId: int = 1;
const maxCollectibleId: int = 740;
let hasLostItem = false;


/**
  * Appartient à l'item Curse Of The Fool.
  *
  * Cette fonction est executé à chaque fois qu'Isaac se prend des dégats, elle récupère tous les collectible
  * qu'Isaac à sur lui en cherchant parmi tout les collectibles du jeu puis on ajoute ça dans un tableau.
  *
  * Enfin si Isaac a des collectible alors on va remove un des items aléatoirement et on va le spawn à sa position.
  *
  * Return TRUE quand on a fait perdre un item.
  * Return FALSE si jamais on a rien executé dans la fonciton pour que tout continue normalement.
**/
export function LoseRandomItem(): boolean
{
  const RNG: RNG = newRNG();

  if(playerInstance?.HasCollectible(CurseOfTheFoolCollectible) && getRandomFloat(0, 1, RNG) < loseItemChance)
  {
    const playerCollectibles: CollectibleType[] = [];

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

      if (chosenItem !== undefined && !hasLostItem)
      {
        hasLostItem = true;
        playerInstance.RemoveCollectible(chosenItem);
        spawnCollectible(chosenItem, playerPos, RNG);

        hasLostItem = false;

        return true;
      }
    }
  }

  return false;
}