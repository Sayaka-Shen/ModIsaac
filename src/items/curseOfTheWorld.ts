/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-lonely-if */

import { LevelCurse, RoomType,CollectibleType  } from "isaac-typescript-definitions";
import { ModCallbackCustom  } from "isaacscript-common";
import type { ModUpgraded } from "isaacscript-common";

const CurseOfTheWorldCollectible = Isaac.GetItemIdByName("Curse Of The World");
const playerInstance = Isaac.GetPlayer();

export function CurseOfTheWorld(mod: ModUpgraded): void
{
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED, AddBlindEffect);
  mod.AddCallbackCustom(ModCallbackCustom.POST_NEW_ROOM_REORDERED, AddBlindEffect);
}

function AddBlindEffect()
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
