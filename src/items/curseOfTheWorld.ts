/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-lonely-if */

import { LevelCurse, RoomType, CollectibleType  } from "isaac-typescript-definitions";

// Variable par défaut pour le script fonctionne
const CurseOfTheWorldCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The World");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * Appartient à l'item Curse Of The World.
  *
  * S'exécute à chaque fois qu'il entre dans une nouvelle pièce et au début quand il obtient l'item.
  *
  * Lorsqu'un joueur rentre dans une autre salle on vérifie si il est dans la première salle
  * ou dans la salle du boss et si c'est bon.
  * On lui ajoute le collectible MIND (donne la vision à toute la map) et on lui enlève Curse Of The Lost si il l'a
  * (ce qui lui empêchait de voir la map).
  * Sinon on inverse l'effet pour que le joueur dans les salles qui ne sont pas boss et première salle ne voit pas la map.
*/
export function AddBlindEffect(): void
{
  const currentRoom: Room = Game().GetRoom();
  const level: Level = Game().GetLevel();

  if(playerInstance?.HasCollectible(CurseOfTheWorldCollectible))
  {
    if((currentRoom.GetType() === RoomType.BOSS || level.GetCurrentRoomIndex() === level.GetStartingRoomIndex()))
    {
      if(!playerInstance?.HasCollectible(CollectibleType.MIND) && level.GetCurses() >= 0)
      {
        level.RemoveCurses(LevelCurse.LOST);
        playerInstance?.AddCollectible(CollectibleType.MIND);
      }
    }
    else
    {
      if(playerInstance?.HasCollectible(CollectibleType.MIND) && level.GetCurses() <= 0)
      {
        level.AddCurse(LevelCurse.LOST, false);
        playerInstance?.RemoveCollectible(CollectibleType.MIND);
      }
    }
  }
}
