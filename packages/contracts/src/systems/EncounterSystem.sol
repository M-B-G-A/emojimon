// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { Player, Encounter, EncounterData, MonsterCatchAttempt, OwnedBy, Monster } from "../codegen/Tables.sol";
import { MonsterCatchResult } from "../codegen/Types.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";
// import { IWorld } from "@mudscan/src/codegen/world/IWorld.sol";

abstract contract IMudScanWorld {
    function setAchievement (address playerAddress, uint32 score, uint32 stage) virtual public;
}

contract EncounterSystem is System {
  address mudscanWorldAddress;

  // constructor() {
  //   mudscanWorldAddress = address(0x4F0Bf35B01279B50437993e962471fF5502bf97C);
  // }

  function setMudscanWorldAddress(address newAddress) public {
    mudscanWorldAddress = newAddress;
  }

  function throwBall() public {
    bytes32 player = addressToEntityKey(_msgSender());
 
    EncounterData memory encounter = Encounter.get(player);
    require(encounter.exists, "not in encounter");
 
    uint256 rand = uint256(
      keccak256(
        abi.encode(player, encounter.monster, encounter.catchAttempts, blockhash(block.number - 1), block.difficulty)
      )
    );
    if (rand % 2 == 0) {
      // 50% chance to catch monster
      MonsterCatchAttempt.emitEphemeral(player, MonsterCatchResult.Caught);
      OwnedBy.set(encounter.monster, player);
      Encounter.deleteRecord(player);
    //   address.delegateCall
      uint32 mt = uint32(Monster.get(encounter.monster));
      IMudScanWorld(mudscanWorldAddress).setAchievement(_msgSender(), 100, mt);
    } else if (encounter.catchAttempts >= 2) {
      // Missed 2 times, monster escapes
      MonsterCatchAttempt.emitEphemeral(player, MonsterCatchResult.Fled);
      Monster.deleteRecord(encounter.monster);
      Encounter.deleteRecord(player);
    } else {
      // Throw missed!
      MonsterCatchAttempt.emitEphemeral(player, MonsterCatchResult.Missed);
      Encounter.setCatchAttempts(player, encounter.catchAttempts + 1);
    }
  }
 
  function flee() public {
    bytes32 player = addressToEntityKey(_msgSender());
 
    EncounterData memory encounter = Encounter.get(player);
    require(encounter.exists, "not in encounter");
 
    Monster.deleteRecord(encounter.monster);
    Encounter.deleteRecord(player);
  }
}