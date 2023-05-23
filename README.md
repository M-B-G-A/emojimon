# MUD Scan - Emojimon

## how to connect MUD Scan AND GAME

1. `git clone https://github.com/M-B-G-A/mud-scan.git`
2. change namespace in `mud.config.ts`
3. deploy it
4. `git clone https://github.com/M-B-G-A/emojimon.git`
5. add some code to your game system. 
```
// add below line on top of contract code.
abstract contract IMudScanWorld {
    function EmojiMon_AchievementSyste_setAchievement (address playerAddress, uint32 score, uint32 stage) virtual public;
}

// add like this line where you want to log score
IMudScanWorld(mudscanWorldAddress).EmojiMon_AchievementSyste_setAchievement(_msgSender(), 100 * mt, mt);
```
6. done



## Play DEMO on lattice testnet

[![emojimon demo](https://github.com/M-B-G-A/emojimon/assets/7679722/172332f3-3e28-48a6-b5a9-55545a72a599)](https://emojimon.buidl.day/?chainId=4242)

## Check stats on lattice testnet

[![mudscan demo](https://github.com/M-B-G-A/emojimon/assets/7679722/b39bed97-9284-4cfc-941b-d95ba08226c0)](https://mudscan.buidl.day/?chainId=4242)