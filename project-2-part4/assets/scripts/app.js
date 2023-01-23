const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;


let chosenAndreLife = 100;
let currentMonsterHealth = chosenAndreLife;
let currentPlayerHealth = chosenAndreLife;
let hasBonusLife = true;

adjustHealthBars (chosenAndreLife);

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
}


function attackMonster (mode) {
  let andreDamage;
  if (mode === 'ATTACK') {
    andreDamage = ATTACK_VALUE;
  } else {
    andreDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(andreDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster ('ATTACK');
}

function strongAttackHandler () {
  attackMonster ('STRONG_ATTACK');
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