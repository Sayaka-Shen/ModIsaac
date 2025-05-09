
/* eslint-disable complete/complete-sentences-line-comments */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { EntityType, ModCallback } from "isaac-typescript-definitions";
import type { ModUpgraded } from "isaacscript-common";

// Variable par défaut pour le script fonctionne
const CurseOfTheMagicianCollectible = Isaac.GetItemIdByName("Curse Of The Magician");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

// Les variables qui gèrent le seuil d'attraction et la force d'attraction
const attractionRange: int = 100;
const attractionStrength: int = 1;

export function CurseOfTheMagician(mod: ModUpgraded): void
{
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, AttractTears);
}

/*
  Check si on a l'item, si les tears sont au player puis on récupère les projectile actuel
  on caclul une distance entre les projectiles et mes tears et si elle est inférieur au seuil
  on calcul une direction et on update la velocité par la dir * la force d'attraction
*/
function AttractTears(tear: EntityTear)
{
  if(playerInstance?.HasCollectible(CurseOfTheMagicianCollectible))
  {
    if(tear.SpawnerType === EntityType.PLAYER)
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
}