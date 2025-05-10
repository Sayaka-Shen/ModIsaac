/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable no-undef-init */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable complete/complete-sentences-line-comments */

import { GridEntityType  } from "isaac-typescript-definitions";
import type { CollectibleType } from "isaac-typescript-definitions";
import { spawnGridEntity  } from "isaacscript-common";

// Variable par défaut pour le script fonctionne
const CurseOfTheDevilCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Devil");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * @param hasTrapDoor Vérifie si une trapdoor à spawn.
  * @param trapDoor Contient l'entité trapDoor qui va être spawn.
*/
let hasTrapdoor: boolean = false;
let trapDoor: GridEntity | undefined = undefined;


/**
  * Appartient à l'item Curse Of The Devil.
  *
  * S'exécute à chaque nouveau level.
  *
  * Elle fait spawn une trapdoor et la stock dans trapDoor.
  * Passe la variable hasTrapDoor à TRUE.
*/
export function SpawnTrapdoor(): void
{
  if(playerInstance?.HasCollectible(CurseOfTheDevilCollectible))
  {
    trapDoor = spawnGridEntity(GridEntityType.TRAPDOOR, Vector(300, 200), true);
    hasTrapdoor = true;
  }
}


/**
  * Appartient à l'item Curse Of The Devil.
  *
  * S'exécute à chaque Update.
  *
  * Si Isaac s'approche de la trap, il est immédiatement téléporter dans une devil room.
  * Lorsqu'Isaac ressort de la devil room, la trap disparaît.
*/
export function TeleportIsaac(): void
{
  if(hasTrapdoor && playerInstance?.HasCollectible(CurseOfTheDevilCollectible))
  {
    if(trapDoor !== undefined && playerInstance?.Position.Distance(trapDoor.Position) <= 30)
    {
      Isaac.ExecuteCommand("goto s.devil");
      trapDoor = spawnGridEntity(GridEntityType.NULL, Vector(300, 200), true);
      hasTrapdoor = false;
    }
  }
}