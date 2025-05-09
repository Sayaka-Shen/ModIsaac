/* eslint-disable no-undef-init */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable unicorn/no-lonely-if */
/* eslint-disable complete/complete-sentences-line-comments */

import { GridEntityType, ModCallback  } from "isaac-typescript-definitions";
import type { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom, spawnGridEntity  } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";

const CurseOfTheDevilCollectible: CollectibleType = Isaac.GetItemIdByName("Curse Of The Devil");
const playerInstance: EntityPlayer = Isaac.GetPlayer();

// Variable la spawn de la trapdoor
let hasTrapdoor: boolean = false;
let trapdoor: GridEntity | undefined = undefined;

export function CurseOfTheDevil(mod: ModUpgraded): void
{
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_LEVEL_REORDERED, SpawnTrapdoor);
  mod.AddCallback(ModCallback.POST_UPDATE, TeleportIsaac);
}

function SpawnTrapdoor()
{
  if(playerInstance?.HasCollectible(CurseOfTheDevilCollectible))
  {
    trapdoor = spawnGridEntity(GridEntityType.TRAPDOOR, Vector(300, 200), true);
    hasTrapdoor = true;
  }
}

function TeleportIsaac()
{
  if(hasTrapdoor && playerInstance?.HasCollectible(CurseOfTheDevilCollectible))
  {
    if(trapdoor !== undefined && playerInstance?.Position.Distance(trapdoor.Position) <= 30)
    {
      Isaac.ExecuteCommand("goto s.devil");
      trapdoor = spawnGridEntity(GridEntityType.NULL, Vector(300, 200), true);
      hasTrapdoor = false;
    }
  }
}