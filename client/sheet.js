import * as main from "/main.js";
import * as utils from "/utilities.js";

// sheet data variables
let abilityScores = {
  "str": 10,
  "dex": 10,
  "con": 10,
  "int": 10,
  "wis": 10,
  "cha": 10,
};
let racialBonuses = {
  "str": 0,
  "dex": 0,
  "con": 0,
  "int": 0,
  "wis": 0,
  "cha": 0,
};
let languages = [];
let raceProficiencies = [];
let classProficiencies = [];
let classProficiencyChoices = [
  {
    choose: 0,
    from: [],
  }
];
let proficiencies = [];
let traits = [];


// update our data entirely dependant on other values
function updateDNDDefaults(){
  document.querySelector("#languages").value = "";
  document.querySelector("#raceProficiencies").value = "";
  document.querySelector("#classProficiencies").value = "";
  document.querySelector("#traits").value = "";
  languages.forEach(lang => document.querySelector("#languages").value += lang + ", ");
  raceProficiencies.forEach(prof => document.querySelector("#raceProficiencies").value += prof + ", ");
  console.log(classProficiencyChoices);
  classProficiencyChoices.forEach(profC => {
    document.querySelector("#classProficiencies").value += `CHOOSE ${profC.choose}: [[`;
    profC.from.forEach(from => document.querySelector("#classProficiencies").value += `\n${from}, `);
    document.querySelector("#classProficiencies").value += `]]\n`;
  });
  document.querySelector("#classProficiencies").value += "DEFAULT:\n";
  classProficiencies.forEach(prof => document.querySelector("#classProficiencies").value += prof + ", ");
    traits.forEach(trt => document.querySelector("#traits").value += trt + ", ");
}

// update ability modifiers based on scores
function updateModifiers() {
  // convert ability scores into modifiers
if(!document.querySelector("#overrideAbilitiesCheck").checked){
  document.querySelector("#strScore").value = abilityScores["str"] + racialBonuses["str"];
  document.querySelector("#dexScore").value = abilityScores["dex"] + racialBonuses["dex"];
  document.querySelector("#conScore").value = abilityScores["con"] + racialBonuses["con"];
  document.querySelector("#intScore").value = abilityScores["int"] + racialBonuses["int"];
  document.querySelector("#wisScore").value = abilityScores["wis"] + racialBonuses["wis"];
  document.querySelector("#chaScore").value = abilityScores["cha"] + racialBonuses["cha"];
}
const strScore = document.querySelector("#strScore").value;
const dexScore = document.querySelector("#dexScore").value;
const conScore = document.querySelector("#conScore").value;
const intScore = document.querySelector("#intScore").value;
const wisScore = document.querySelector("#wisScore").value;
const chaScore = document.querySelector("#chaScore").value;

  document.querySelector("#strMod").value = Math.floor(
    (strScore - 10) / 2
  );
  document.querySelector("#dexMod").value = Math.floor(
    (dexScore - 10) / 2
  );
  document.querySelector("#conMod").value = Math.floor(
    (conScore - 10) / 2
  );
  document.querySelector("#intMod").value = Math.floor(
    (intScore - 10) / 2
  );
  document.querySelector("#wisMod").value = Math.floor(
    (wisScore - 10) / 2
  );
  document.querySelector("#chaMod").value = Math.floor(
    (chaScore - 10) / 2
  );


  setSkills();
  enableArmor();
  equipArmor(equippedArmor);
  shieldEquip(shieldEquip);
}

// update proficiencies based on ability scores and proficiency checks
function updateProfBonus() {
  // update proficiency bonus based on player level

  const playerLevel = parseInt(
    document.querySelector("#playerLevel").value
  );

  if (playerLevel >= 17) {
    document.querySelector("#profBonus").value = 6;
  } else if (playerLevel >= 13) {
    document.querySelector("#profBonus").value = 5;
  } else if (playerLevel >= 9) {
    document.querySelector("#profBonus").value = 4;
  } else if (playerLevel >= 5) {
    document.querySelector("#profBonus").value = 3;
  } else {
    document.querySelector("#profBonus").value = 2;
  }
}

// set skill values based on proficiency
function setSkills() {
  const profBonus = parseInt(document.querySelector("#profBonus").value);
  const strMod = parseInt(document.querySelector("#strMod").value);
  const dexMod = parseInt(document.querySelector("#dexMod").value);
  const conMod = parseInt(document.querySelector("#conMod").value);
  const intMod = parseInt(document.querySelector("#intMod").value);
  const wisMod = parseInt(document.querySelector("#wisMod").value);
  const chaMod = parseInt(document.querySelector("#chaMod").value);

  if (document.querySelector("#acroProf").checked == true) {
    document.querySelector("#acroScore").value = dexMod + profBonus;
  } else {
    document.querySelector("#acroScore").value = dexMod;
  }
  if (document.querySelector("#animProf").checked == true) {
    document.querySelector("#animScore").value = wisMod + profBonus;
  } else {
    document.querySelector("#animScore").value = wisMod;
  }
  if (document.querySelector("#arcaProf").checked == true) {
    document.querySelector("#arcaScore").value = intMod + profBonus;
  } else {
    document.querySelector("#arcaScore").value = intMod;
  }
  if (document.querySelector("#athlProf").checked == true) {
    document.querySelector("#athlScore").value = strMod + profBonus;
  } else {
    document.querySelector("#athlScore").value = strMod;
  }
  if (document.querySelector("#decProf").checked == true) {
    document.querySelector("#decScore").value = chaMod + profBonus;
  } else {
    document.querySelector("#decScore").value = chaMod;
  }
  if (document.querySelector("#hisProf").checked == true) {
    document.querySelector("#hisScore").value = intMod + profBonus;
  } else {
    document.querySelector("#hisScore").value = intMod;
  }
  if (document.querySelector("#insProf").checked == true) {
    document.querySelector("#insScore").value = wisMod + profBonus;
  } else {
    document.querySelector("#insScore").value = wisMod;
  }
  if (document.querySelector("#intiProf").checked == true) {
    document.querySelector("#intiScore").value = chaMod + profBonus;
  } else {
    document.querySelector("#intiScore").value = chaMod;
  }
  if (document.querySelector("#invProf").checked == true) {
    document.querySelector("#invScore").value = intMod + profBonus;
  } else {
    document.querySelector("#invScore").value = intMod;
  }
  if (document.querySelector("#medProf").checked == true) {
    document.querySelector("#medScore").value = wisMod + profBonus;
  } else {
    document.querySelector("#medScore").value = wisMod;
  }
  if (document.querySelector("#natProf").checked == true) {
    document.querySelector("#natScore").value = intMod + profBonus;
  } else {
    document.querySelector("#natScore").value = intMod;
  }
  if (document.querySelector("#percProf").checked == true) {
    document.querySelector("#percScore").value = wisMod + profBonus;
  } else {
    document.querySelector("#percScore").value = wisMod;
  }
  if (document.querySelector("#perfProf").checked == true) {
    document.querySelector("#perfScore").value = chaMod + profBonus;
  } else {
    document.querySelector("#perfScore").value = chaMod;
  }
  if (document.querySelector("#persProf").checked == true) {
    document.querySelector("#persScore").value = chaMod + profBonus;
  } else {
    document.querySelector("#persScore").value = chaMod;
  }
  if (document.querySelector("#relProf").checked == true) {
    document.querySelector("#relScore").value = intMod + profBonus;
  } else {
    document.querySelector("#relScore").value = intMod;
  }
  if (document.querySelector("#sleiProf").checked == true) {
    document.querySelector("#sleiScore").value = dexMod + profBonus;
  } else {
    document.querySelector("#sleiScore").value = dexMod;
  }
  if (document.querySelector("#steProf").checked == true) {
    document.querySelector("#steScore").value = dexMod + profBonus;
  } else {
    document.querySelector("#steScore").value = dexMod;
  }
  if (document.querySelector("#survProf").checked == true) {
    document.querySelector("#survScore").value = wisMod + profBonus;
  } else {
    document.querySelector("#survScore").value = wisMod;
  }
}

// equip chosen armor and affect modifiers and AC
function equipArmor(equippedArmor) {
  const armor = equippedArmor.value;
  if (armor == "padded") {
    document.querySelector("#armorClass").value =
      parseInt(document.querySelector("#dexMod").value) + 11;
  } else if (armor == "leather") {
    document.querySelector("#armorClass").value =
      parseInt(document.querySelector("#dexMod").value) + 11;
  } else if (armor == "studded") {
    document.querySelector("#armorClass").value =
      parseInt(document.querySelector("#dexMod").value) + 12;
  } else if (armor == "hide") {
    var tempArmor =
      parseInt(document.querySelector("#dexMod").value) + 12;
    if (tempArmor > 14) {
      document.querySelector("#armorClass").value = 14;
    } else {
      document.querySelector("#armorClass").value = tempArmor;
    }
  } else if (armor == "chain") {
    var tempArmor =
      parseInt(document.querySelector("#dexMod").value) + 13;
    if (tempArmor > 15) {
      document.querySelector("#armorClass").value = 15;
    } else {
      document.querySelector("#armorClass").value = tempArmor;
    }
  } else if (armor == "scale") {
    var tempArmor =
      parseInt(document.querySelector("#dexMod").value) + 14;
    if (tempArmor > 16) {
      document.querySelector("#armorClass").value = 16;
    } else {
      document.querySelector("#armorClass").value = tempArmor;
    }
  } else if (armor == "breastplate") {
    var tempArmor =
      parseInt(document.querySelector("#dexMod").value) + 14;
    if (tempArmor > 16) {
      document.querySelector("#armorClass").value = 16;
    } else {
      document.querySelector("#armorClass").value = tempArmor;
    }
  } else if (armor == "halfplate") {
    var tempArmor =
      parseInt(document.querySelector("#dexMod").value) + 15;
    if (tempArmor > 17) {
      document.querySelector("#armorClass").value = 17;
    } else {
      document.querySelector("#armorClass").value = tempArmor;
    }
  } else if (armor == "ringmail") {
    document.querySelector("#armorClass").value = 14;
  } else if (armor == "chainmail") {
    document.querySelector("#armorClass").value = 16;
  } else if (armor == "splint") {
    document.querySelector("#armorClass").value = 17;
  } else if (armor == "plate") {
    document.querySelector("#armorClass").value = 18;
  } else {
    document.querySelector("#armorClass").value =
      parseInt(document.querySelector("#dexMod").value) + 10;
  }
}

// equip shield and affect AC
function shieldEquip(shieldEquip) {
  const shield = shieldEquip.value;
  if (shield == "shield") {
    document.querySelector("#armorClass").value =
      parseInt(document.querySelector("#armorClass").value) + 2;
  } else {
    equipArmor(equippedArmor);
  }
}

// Decide which armor is wearable based on ability scores
function enableArmor() {
  const strScore = document.querySelector("#strScore").value;
  if (strScore > 14) {
    document.querySelector("#plateArmor").disabled = false;
    document.querySelector("#splintArmor").disabled = false;
    document.querySelector("#chainmailArmor").disabled = false;
  } else if (strScore > 12) {
    document.querySelector("#plateArmor").disabled = true;
    document.querySelector("#splintArmor").disabled = true;
    document.querySelector("#chainmailArmor").disabled = false;
  } else {
    document.querySelector("#plateArmor").disabled = true;
    document.querySelector("#splintArmor").disabled = true;
    document.querySelector("#chainmailArmor").disabled = true;
  }
}

// change certain data based on level milestone
function playerLevelChange() {
  updateProfBonus();
  updateModifiers();
  setSkills();
}

export{
  abilityScores,
  languages, 
  raceProficiencies,
  classProficiencies,
  classProficiencyChoices,
  proficiencies,
  traits,
  racialBonuses,
  updateDNDDefaults,
  updateModifiers,
  setSkills,
  updateProfBonus,
  equipArmor,
  shieldEquip,
  enableArmor,
  playerLevelChange,
}