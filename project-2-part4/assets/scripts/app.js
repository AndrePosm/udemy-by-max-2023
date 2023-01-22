const ATTACK_VALUE = 10;

let chosenAndreLife = 100;
let currentMonsterHealth = chosenAndreLife;
let currentPlayerHealth = chosenAndreLife;

adjustHealthBars (chosenAndreLife);

function attackHandler() {
  const damage = dealMonsterDamage (ATTACK_VALUE);
  currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);