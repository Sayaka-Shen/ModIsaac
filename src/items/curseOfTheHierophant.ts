/* eslint-disable @typescript-eslint/no-unsafe-unary-minus */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complete/complete-sentences-line-comments */

import type { CollectibleType } from "isaac-typescript-definitions";

// Variable par défaut pour le script fonctionne
const CurseOfTheHierophantCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Hierophant");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * Appartient à l'item Curse Of The Hierophant.
  *
  * S'exécute lorsqu'Isaac obtient un nouvelle l'item.
  *
  * Isaac perd ses coeurs normaux et obtient des coeurs squelettiques.
*/
export function GiveIsaacSkeletonHeart(): void
{
  if(playerInstance?.HasCollectible(CurseOfTheHierophantCollectible) && playerInstance?.GetHearts() > 0)
  {
    playerInstance.AddMaxHearts(-playerInstance.GetHearts(), true);
    playerInstance.AddBoneHearts(3);
  }
}

