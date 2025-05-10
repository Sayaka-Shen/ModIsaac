/* eslint-disable complete/complete-sentences-jsdoc */
/* eslint-disable complete/format-jsdoc-comments */
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { EntityType  } from "isaac-typescript-definitions";
import type { CollectibleType } from "isaac-typescript-definitions";

// Variable par défaut pour le script fonctionne
const CurseOfTheMagicianCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Magician");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

/**
  * @param attractionRange = La range dans laquel un projectile se fera attirer par une tears
  * @param attractionStrength = La force d'attraction appliqué au projectile attiré
**/
const attractionRange: int = 100;
const attractionStrength: int = 1;


/**
  * Appartient à l'item Curse Of The Magician.
  *
  * S'exécute à chaque fois qu'Isaac tire.
  *
  * Check si on a l'item et si les tears sont au player puis on récupère les projectile actuel.
  * On caclul une distance entre les projectiles et mes tears et si elle est inférieur au seuil.
  * On calcul une direction et on update la velocité par la dir * la force d'attraction.
*/
export function AttractTears(tear: EntityTear): void
{
  if(playerInstance?.HasCollectible(CurseOfTheMagicianCollectible) && tear.SpawnerType === EntityType.PLAYER)
  {
    for (const element of Isaac.FindByType(EntityType.PROJECTILE, -1, -1, false))
      {
        // Conversion pour être sur que c'est un projectile
        const projectile = element.ToProjectile();

        if(projectile !== undefined)
        {
          const projectileDist: float = projectile?.Position.sub(tear.Position).Length();

          if(projectileDist <= attractionRange)
          {
            const projectileDir: Vector = tear.Position.sub(projectile?.Position).Normalized();

            projectile.Velocity = projectile?.Velocity.add(projectileDir).mul(attractionStrength);
          }
        }
      }
  }
}