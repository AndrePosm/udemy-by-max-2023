const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1

const enterredValue = prompt('Max life for you and monster','100');

let chosenAndreLife = parseInt(enterredValue);

if (isNaN(chosenAndreLife) || chosenAndreLife <= 0) {
  chosenAndreLife = 100;
}

let currentMonsterHealth = chosenAndreLife;
let currentPlayerHealth = chosenAndreLife;
let hasBonusLife = true;

adjustHealthBars (chosenAndreLife);

function reset() {
  currentMonsterHealth = chosenAndreLife;
  currentPlayerHealth = chosenAndreLife;
  resetGame(chosenAndreLife);
}

function endRound () {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but bonus life saved you xD");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert("You lost ! :( ... Poveze nastupnogo razu =)");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
      alert("You have a draw");
    }

    if (
      currentMonsterHealth <= 0 || currentPlayerHealth <= 0
    ) {
    reset();
  }
}


function attackMonster (mode) {
  let andreDamage;
  if (mode === MODE_ATTACK) {
    andreDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    andreDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(andreDamage);
  currentMonsterHealth -= damage;
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
  endRound();
}

attackBtn.addEventListener ('click', attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener ('click', healPlayerHandler);