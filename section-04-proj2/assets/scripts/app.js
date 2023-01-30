const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enterredValue = prompt('Max life for you and monster','100');

let chosenAndreLife = parseInt(enterredValue);
let battleLog = [];
let lastLoggedEntery;

if (isNaN(chosenAndreLife) || chosenAndreLife <= 0) {
  chosenAndreLife = 100;
}

let currentMonsterHealth = chosenAndreLife;
let currentPlayerHealth = chosenAndreLife;
let hasBonusLife = true;

adjustHealthBars (chosenAndreLife);

function writeToLog (event, value, monsterHealth, playerHealth){
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
     logEntry = {
       event: event,
       value: value,
       target: "MONSTER",
       finalMonsterHealth: monsterHealth,
       finalPlayerHealth: playerHealth,
     };
     break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: event,
        value: value,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};

  }
  /* if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK){
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL){
    logEntry = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };

  } else if (event === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
  }*/
  battleLog.push(logEntry);
}



function reset() {
  currentMonsterHealth = chosenAndreLife;
  currentPlayerHealth = chosenAndreLife;
  resetGame(chosenAndreLife);
}

function endRound () {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
    );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but bonus life saved you xD");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("You won!");
      writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        'PLAYER WON',
        currentMonsterHealth,
        currentPlayerHealth
      );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert("You lost ! :( ... Poveze nastupnogo razu =)");
      writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        "MONSTER WON",
        currentMonsterHealth,
        currentPlayerHealth
      );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("You have a draw");
      writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        "A DRAW",
        currentMonsterHealth,
        currentPlayerHealth
      );
    }

    if (
      currentMonsterHealth <= 0 || currentPlayerHealth <= 0
    ) {
    reset();
  }
}


function attackMonster (mode) {
  let andreDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    andreDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    andreDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(andreDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackHandler() {
  attackMonster (MODE_ATTACK);
}

function strongAttackHandler () {
  attackMonster (MODE_STRONG_ATTACK);
}

function healPlayerHandler () {
  let healValue;
  if (currentPlayerHealth >= chosenAndreLife - HEAL_VALUE) {
    alert ('You cant heal to more then your max initial health')
    healValue = chosenAndreLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth (healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler () {
 for (let i = 0; i < 3; i++) {
   console.log("---------");
 }
  let j = 0;
  do {
    console.log (j);
    j++;
} while (j < 3);

 // for (let i = 10; i > 0;) {
 //   i--;
 //   console.log(i);
 // }
  
//  for (let i = 0; i < battleLog.length; i++) {
//    console.log(battleLog[i]);
//  }

  let i = 0;
  for (const logEntry of battleLog) {
    if (!lastLoggedEntery && lastLoggedEntery !== 0 || lastLoggedEntery < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
      }
      lastLoggedEntery = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener ('click', attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener ('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);