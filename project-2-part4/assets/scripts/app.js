const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenAndreLife = 100;
let currentMonsterHealth = chosenAndreLife;
let currentPlayerHealth = chosenAndreLife;

adjustHealthBars (chosenAndreLife);

function attackMonster (mode) {
  let andreDamage;
  if (mode === 'ATTACK') {
    andreDamage = ATTACK_VALUE;
  } else {
    andreDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(andreDamage);
  currentMonsterHealth -= damage;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost ! :( ... Poveze nastupnogo razu =)");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("You have a draw");
  }
}

function attackHandler() {
  attackMonster ('ATTACK');
}

function strongAttackHandler () {
  attackMonster ('STRONG_ATTACK');
}

attackBtn.addEventListener ('click', attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);