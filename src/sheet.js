function fillAbilityScores() {
    const abilitiesDiv = document.querySelector("#abilitiesDiv");
    const abilityFields = document.querySelectorAll(".ability");

    abilityFields.forEach((e) => {
      e.value = rollForAbilityScore();
    });
  }

  function updateModifiers() {
    // convert ability scores into modifiers

    const strScore = document.getElementById("strScore").value;
    document.getElementById("strMod").value = Math.floor(
      (strScore - 10) / 2
    );
    const dexScore = document.getElementById("dexScore").value;
    document.getElementById("dexMod").value = Math.floor(
      (dexScore - 10) / 2
    );
    const conScore = document.getElementById("conScore").value;
    document.getElementById("conMod").value = Math.floor(
      (conScore - 10) / 2
    );
    const intScore = document.getElementById("intScore").value;
    document.getElementById("intMod").value = Math.floor(
      (intScore - 10) / 2
    );
    const wisScore = document.getElementById("wisScore").value;
    document.getElementById("wisMod").value = Math.floor(
      (wisScore - 10) / 2
    );
    const chaScore = document.getElementById("chaScore").value;
    document.getElementById("chaMod").value = Math.floor(
      (chaScore - 10) / 2
    );

    setSkills();
    enableArmor();
    equipArmor(equippedArmor);
    shieldEquip(shieldEquip);
  }

  function updateProfBonus() {
    // update proficiency bonus based on player level

    const playerLevel = parseInt(
      document.getElementById("playerLevel").value
    );

    if (playerLevel >= 17) {
      document.getElementById("profBonus").value = 6;
    } else if (playerLevel >= 13) {
      document.getElementById("profBonus").value = 5;
    } else if (playerLevel >= 9) {
      document.getElementById("profBonus").value = 4;
    } else if (playerLevel >= 5) {
      document.getElementById("profBonus").value = 3;
    } else {
      document.getElementById("profBonus").value = 2;
    }
  }

  function setSkills() {
    const profBonus = parseInt(document.getElementById("profBonus").value);
    const strMod = parseInt(document.getElementById("strMod").value);
    const dexMod = parseInt(document.getElementById("dexMod").value);
    const conMod = parseInt(document.getElementById("conMod").value);
    const intMod = parseInt(document.getElementById("intMod").value);
    const wisMod = parseInt(document.getElementById("wisMod").value);
    const chaMod = parseInt(document.getElementById("chaMod").value);

    if (document.getElementById("acroProf").checked == true) {
      document.getElementById("acroScore").value = dexMod + profBonus;
    } else {
      document.getElementById("acroScore").value = dexMod;
    }
    if (document.getElementById("animProf").checked == true) {
      document.getElementById("animScore").value = wisMod + profBonus;
    } else {
      document.getElementById("animScore").value = wisMod;
    }
    if (document.getElementById("arcaProf").checked == true) {
      document.getElementById("arcaScore").value = intMod + profBonus;
    } else {
      document.getElementById("arcaScore").value = intMod;
    }
    if (document.getElementById("athlProf").checked == true) {
      document.getElementById("athlScore").value = strMod + profBonus;
    } else {
      document.getElementById("athlScore").value = strMod;
    }
    if (document.getElementById("decProf").checked == true) {
      document.getElementById("decScore").value = chaMod + profBonus;
    } else {
      document.getElementById("decScore").value = chaMod;
    }
    if (document.getElementById("hisProf").checked == true) {
      document.getElementById("hisScore").value = intMod + profBonus;
    } else {
      document.getElementById("hisScore").value = intMod;
    }
    if (document.getElementById("insProf").checked == true) {
      document.getElementById("insScore").value = wisMod + profBonus;
    } else {
      document.getElementById("insScore").value = wisMod;
    }
    if (document.getElementById("intiProf").checked == true) {
      document.getElementById("intiScore").value = chaMod + profBonus;
    } else {
      document.getElementById("intiScore").value = chaMod;
    }
    if (document.getElementById("invProf").checked == true) {
      document.getElementById("invScore").value = intMod + profBonus;
    } else {
      document.getElementById("invScore").value = intMod;
    }
    if (document.getElementById("medProf").checked == true) {
      document.getElementById("medScore").value = wisMod + profBonus;
    } else {
      document.getElementById("medScore").value = wisMod;
    }
    if (document.getElementById("natProf").checked == true) {
      document.getElementById("natScore").value = intMod + profBonus;
    } else {
      document.getElementById("natScore").value = intMod;
    }
    if (document.getElementById("percProf").checked == true) {
      document.getElementById("percScore").value = wisMod + profBonus;
    } else {
      document.getElementById("percScore").value = wisMod;
    }
    if (document.getElementById("perfProf").checked == true) {
      document.getElementById("perfScore").value = chaMod + profBonus;
    } else {
      document.getElementById("perfScore").value = chaMod;
    }
    if (document.getElementById("persProf").checked == true) {
      document.getElementById("persScore").value = chaMod + profBonus;
    } else {
      document.getElementById("persScore").value = chaMod;
    }
    if (document.getElementById("relProf").checked == true) {
      document.getElementById("relScore").value = intMod + profBonus;
    } else {
      document.getElementById("relScore").value = intMod;
    }
    if (document.getElementById("sleiProf").checked == true) {
      document.getElementById("sleiScore").value = dexMod + profBonus;
    } else {
      document.getElementById("sleiScore").value = dexMod;
    }
    if (document.getElementById("steProf").checked == true) {
      document.getElementById("steScore").value = dexMod + profBonus;
    } else {
      document.getElementById("steScore").value = dexMod;
    }
    if (document.getElementById("survProf").checked == true) {
      document.getElementById("survScore").value = wisMod + profBonus;
    } else {
      document.getElementById("survScore").value = wisMod;
    }
  }

  function equipArmor(equippedArmor) {
    const armor = equippedArmor.value;
    if (armor == "padded") {
      document.getElementById("armorClass").value =
        parseInt(document.getElementById("dexMod").value) + 11;
    } else if (armor == "leather") {
      document.getElementById("armorClass").value =
        parseInt(document.getElementById("dexMod").value) + 11;
    } else if (armor == "studded") {
      document.getElementById("armorClass").value =
        parseInt(document.getElementById("dexMod").value) + 12;
    } else if (armor == "hide") {
      var tempArmor =
        parseInt(document.getElementById("dexMod").value) + 12;
      if (tempArmor > 14) {
        document.getElementById("armorClass").value = 14;
      } else {
        document.getElementById("armorClass").value = tempArmor;
      }
    } else if (armor == "chain") {
      var tempArmor =
        parseInt(document.getElementById("dexMod").value) + 13;
      if (tempArmor > 15) {
        document.getElementById("armorClass").value = 15;
      } else {
        document.getElementById("armorClass").value = tempArmor;
      }
    } else if (armor == "scale") {
      var tempArmor =
        parseInt(document.getElementById("dexMod").value) + 14;
      if (tempArmor > 16) {
        document.getElementById("armorClass").value = 16;
      } else {
        document.getElementById("armorClass").value = tempArmor;
      }
    } else if (armor == "breastplate") {
      var tempArmor =
        parseInt(document.getElementById("dexMod").value) + 14;
      if (tempArmor > 16) {
        document.getElementById("armorClass").value = 16;
      } else {
        document.getElementById("armorClass").value = tempArmor;
      }
    } else if (armor == "halfplate") {
      var tempArmor =
        parseInt(document.getElementById("dexMod").value) + 15;
      if (tempArmor > 17) {
        document.getElementById("armorClass").value = 17;
      } else {
        document.getElementById("armorClass").value = tempArmor;
      }
    } else if (armor == "ringmail") {
      document.getElementById("armorClass").value = 14;
    } else if (armor == "chainmail") {
      document.getElementById("armorClass").value = 16;
    } else if (armor == "splint") {
      document.getElementById("armorClass").value = 17;
    } else if (armor == "plate") {
      document.getElementById("armorClass").value = 18;
    } else {
      document.getElementById("armorClass").value =
        parseInt(document.getElementById("dexMod").value) + 10;
    }
  }

  function shieldEquip(shieldEquip) {
    const shield = shieldEquip.value;
    if (shield == "shield") {
      document.getElementById("armorClass").value =
        parseInt(document.getElementById("armorClass").value) + 2;
    } else {
      equipArmor(equippedArmor);
    }
  }

  function enableArmor() {
    const strScore = document.getElementById("strScore").value;
    if (strScore > 14) {
      document.getElementById("plateArmor").disabled = false;
      document.getElementById("splintArmor").disabled = false;
      document.getElementById("chainmailArmor").disabled = false;
    } else if (strScore > 12) {
      document.getElementById("plateArmor").disabled = true;
      document.getElementById("splintArmor").disabled = true;
      document.getElementById("chainmailArmor").disabled = false;
    } else {
      document.getElementById("plateArmor").disabled = true;
      document.getElementById("splintArmor").disabled = true;
      document.getElementById("chainmailArmor").disabled = true;
    }
  }

  function playerLevelChange() {
    updateProfBonus();
    updateModifiers();
    setSkills();
  }