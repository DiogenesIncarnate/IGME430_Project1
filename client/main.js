import * as sheet from "/sheet.js";
import * as utils from "/utilities.js";

const DND_API_URL = "https://www.dnd5eapi.co/api/";
let currentUID = utils.ID();

// Automatically sets ability scores
const fillAbilityScores = () => {
    const abilityFields = document.querySelectorAll(".abilityScore");

    for(let [key, value] of Object.entries(sheet.abilityScores)){
      sheet.abilityScores[key] = utils.rollForAbilityScore();
    } 

    sheet.updateModifiers();
  };

  // Take any JSON responses and parse them into legible HTML
  const parseJSON = (xhr, content, UID) => {
    try {
      const obj = JSON.parse(xhr.response);
      if (obj) console.dir(obj);

      // Set Character sheet once again, from Get response
      if (obj.characters) {
        content.innerHTML = "";
        if(UID){
          document.querySelector("#nameField").value = obj.characters[UID].nameField;
          document.querySelector("#raceField").selectedIndex = obj.characters[UID].raceField;
          document.querySelector("#classField").selectedIndex = obj.characters[UID].classField;
          document.querySelector("#lawField").selectedIndex = obj.characters[UID].lawField;
          document.querySelector("#moralField").selectedIndex = obj.characters[UID].moralField;
          sheet.abilityScores["str"] = parseInt(obj.characters[UID].str);
          sheet.abilityScores["dex"] = parseInt(obj.characters[UID].dex);
          sheet.abilityScores["con"] = parseInt(obj.characters[UID].con);
          sheet.abilityScores["int"] = parseInt(obj.characters[UID].int);
          sheet.abilityScores["wis"] = parseInt(obj.characters[UID].wis);
          sheet.abilityScores["cha"] = parseInt(obj.characters[UID].cha);
          document.querySelectorAll(".skillProf").forEach(el => {
            let cond = (obj.characters[UID][el.id] === "true");
            el.checked = cond;
          });
          document.querySelector("#equippedArmor").selectedIndex = obj.characters[UID].equippedArmor;
          document.querySelector("#shieldEquip").selectedIndex = obj.characters[UID].shieldEquip;
        }
        else{
          for (const ch in obj.characters) {
          document.querySelector("#nameField").value = obj.characters[ch].nameField;
          document.querySelector("#raceField").selectedIndex = obj.characters[ch].raceField;
          document.querySelector("#classField").selectedIndex = obj.characters[ch].classField;
          document.querySelector("#lawField").selectedIndex = obj.characters[ch].lawField;
          document.querySelector("#moralField").selectedIndex = obj.characters[ch].moralField;
          sheet.abilityScores["str"] = parseInt(obj.characters[ch].str);
          sheet.abilityScores["dex"] = parseInt(obj.characters[ch].dex);
          sheet.abilityScores["con"] = parseInt(obj.characters[ch].con);
          sheet.abilityScores["int"] = parseInt(obj.characters[ch].int);
          sheet.abilityScores["wis"] = parseInt(obj.characters[ch].wis);
          sheet.abilityScores["cha"] = parseInt(obj.characters[ch].cha);
          document.querySelectorAll(".skillProf").forEach(el => {
            let cond = (obj.characters[ch][el.id] === "true");
            el.checked = cond;
          });
          document.querySelector("#equippedArmor").selectedIndex = obj.characters[ch].equippedArmor;
          document.querySelector("#shieldEquip").selectedIndex = obj.characters[ch].shieldEquip;
          let chOption = document.createElement("input");
          chOption.type = "button";
          chOption.classList.add("p-2");
          chOption.value = `${obj.characters[ch].nameField} - ${document.querySelector("#raceField")[obj.characters[ch].raceField].text} - ${document.querySelector("#classField")[obj.characters[ch].classField].text} - ${obj.characters[ch].playerLevel}`;
          chOption.id = obj.characters[ch].UID;
          chOption.addEventListener("click", setupFocusSheet);
          content.append(chOption);
        }
      }
    }
      sheet.updateDNDDefaults();
      sheet.updateModifiers();
    } catch (e) {}
  };

  // Focus specific sheet data
  const setupFocusSheet = (e) => {
    const characterForm = document.querySelector("#characterForm");
    const getCharacters = (e) => requestUpdate(e, characterForm, currentUID);
    currentUID = e.target.id;
    getCharacters(e);
    //changeView();
  };

  // Set the html response title based on the status code, then parse any JSON
  const handleResponse = (xhr) => {
    const content = document.querySelector("#content");

    switch (xhr.status) {
      case 200:
        content.innerHTML = "<h2>Success!</h2>";
        break;
      case 201:
        content.innerHTML = "<h2>Created!</h2>";
        break;
      case 204:
        content.innerHTML = "<h2>Updated (No Content)!</h2>";
        break;
      case 400:
        content.innerHTML = "<h2>Bad Request :(</h2>";
        break;
      case 404:
        content.innerHTML = "<h2>Resource Not Found :(</h2>";
        break;
      default:
        content.innerHTML =
          "<p>Error code not implemented by client :(</p>";
        break;
    }

    parseJSON(xhr, content);
  };

  // Gets api data on race
  const setExternalRaceInfo = (e) => {
    let xhr = e.target;
    const obj = JSON.parse(xhr.responseText);


    for(let [key, value] of Object.entries(sheet.racialBonuses)) sheet.racialBonuses[key] = 0;
    console.log(sheet.racialBonuses);
    obj.ability_bonuses.forEach(el => {
      console.log(el);
      sheet.racialBonuses[el.index] = el.bonus;
      sheet.updateModifiers();
    });

    sheet.languages.length = 0;
    for(let i = 0; i < obj.languages.length; i++){
      sheet.languages.push(obj.languages[i].name);
    }
    document.querySelector("#languageDescription").innerHTML = obj.language_desc;
  
    sheet.raceProficiencies.length = 0;
    for(let i = 0; i < obj.starting_proficiencies.length; i++){
      sheet.raceProficiencies.push(obj.starting_proficiencies[i].name);
    }

    sheet.traits.length = 0;
    for(let i = 0; i < obj.traits.length; i++){
      sheet.traits.push(obj.traits[i].name);
    }
    console.log(sheet.traits);

    sheet.updateDNDDefaults();
  };

  // gets api data on class
  const setExternalClassInfo = (e) => {
    let xhr = e.target;
    const obj = JSON.parse(xhr.responseText);

    sheet.classProficiencyChoices.length = 0;
    for(let i = 0; i < obj.proficiency_choices.length; i++){
      sheet.classProficiencyChoices.push({choose:obj.proficiency_choices[i].choose, from:[]})
      for(let j = 0; j < obj.proficiency_choices[i].from.length; j++){
        sheet.classProficiencyChoices[i].from.push(obj.proficiency_choices[i].from[j].name);
      }
    }
    sheet.classProficiencies.length = 0;
    for(let i = 0; i < obj.proficiencies.length; i++){
      sheet.classProficiencies[i] = obj.proficiencies[i].name;
    }

    sheet.updateDNDDefaults();
  };

  // ajax request for external dnd api
  const getDNDInfo = (url, type) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", "application/json");

    if(type === "races")
    xhr.onload = setExternalRaceInfo;
    else if(type === 'classes')
    xhr.onload = setExternalClassInfo;

    xhr.send();
  };

  // Sends request to update our user object data
  const requestUpdate = (e, characterForm, UID) => {
    const method = characterForm.getAttribute("method");
    const content = document.querySelector("#content");

    const xhr = new XMLHttpRequest();
    xhr.open(method, "/getCharacters");

    xhr.setRequestHeader("Accept", "application/json");

    xhr.onload = () => parseJSON(xhr, content, UID);

    xhr.send();

    e.preventDefault();
    return false;
  };

  // Will send a request to post new data to the server
  // to ultimately add to our users object
  const sendPost = (e, dataForm) => {
    e.preventDefault();

    const dataAction = dataForm.getAttribute("action");
    const dataMethod = dataForm.getAttribute("method");
    const nameField = dataForm.querySelector("#nameField");
    const raceField = dataForm.querySelector("#raceField");
    const classField = dataForm.querySelector("#classField");
    const lawField = dataForm.querySelector("#lawField");
    const moralField = dataForm.querySelector("#moralField");
    const abilityFields = document.querySelectorAll(".abilityScore");
    const playerLevel = document.querySelector("#playerLevel");
    const equippedArmor = document.querySelector("#equippedArmor");
    const shieldEquip = document.querySelector("#shieldEquip");
    const proficiencyFields = document.querySelectorAll(".skillProf");

    const xhr = new XMLHttpRequest();
    xhr.open(dataMethod, dataAction);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    xhr.onload = () => handleResponse(xhr);

    //fillAbilityScores();

    let formData = "";
    formData += `UID=${currentUID}`;
    formData += `&${raceField.id}=${raceField.selectedIndex}`;
    formData += `&${nameField.id}=${nameField.value}`;
    formData += `&${classField.id}=${classField.selectedIndex}`;
    formData += `&${lawField.id}=${lawField.selectedIndex}`;
    formData += `&${moralField.id}=${moralField.selectedIndex}`;
    for(const a in sheet.abilityScores){
      formData += `&${a}=${sheet.abilityScores[a]}`;
    }
    formData += `&${playerLevel.id}=${playerLevel.value}`;
    formData += `&${equippedArmor.id}=${equippedArmor.selectedIndex}`;
    formData += `&${shieldEquip.id}=${shieldEquip.selectedIndex}`;
    proficiencyFields.forEach(p => formData += `&${p.id}=${p.checked}`);

    console.log(formData);

    xhr.send(formData);

    return false;
  };

  // formats url for external api
  const formatDNDURL = (dataType, subType) => {
      let url = DND_API_URL;
      if(dataType){
        url += dataType;
        if(subType){
          url += "/" + subType.toLowerCase();
        }
      }

      return url;
  };

  // Make sheet div invisible
  const changeView = () => {
    const characterForm = document.querySelector("#characterForm");

    if(document.querySelector("#characterSheet").style.display == "none"){
      document.querySelector("#characterSheet").style.display = "block";
    }
    else{
      document.querySelector("#characterSheet").style.display = "none";
    }
  };

  // Initialize any form events
  const init = () => {
    const dataForm = document.querySelector("#dataForm");
    const characterForm = document.querySelector("#characterForm");
    const rollAbilitiesBtn = document.querySelector("#rollAbilitiesBtn");
    const raceField = dataForm.querySelector("#raceField");
    const classField = dataForm.querySelector("#classField");
    const abilityScores = document.querySelectorAll(".abilityScore");
    const skillProfs = document.querySelectorAll(".skillProf");
    const equipShield = document.querySelector("#shieldEquip");
    const equippedArmor = document.querySelector("#equippedArmor");
    const playerLevel = document.querySelector("#playerLevel");

    const addCharacter = (e) => sendPost(e, dataForm);
    const getCharacters = (e) => requestUpdate(e, characterForm, null);

    const getExternalRaceInfo = () => getDNDInfo(formatDNDURL("races", raceField.value), "races");
    getExternalRaceInfo();
    const getExternalClassInfo = () => getDNDInfo(formatDNDURL("classes", classField.value), "classes");
    getExternalClassInfo();

    raceField.addEventListener("change", getExternalRaceInfo);
    classField.addEventListener("change", getExternalClassInfo)
    abilityScores.forEach((el) => {
      el.addEventListener("change", sheet.updateModifiers);
    });
    skillProfs.forEach((el) => el.addEventListener("change", sheet.setSkills));
    playerLevel.addEventListener("change", sheet.playerLevelChange);
    equipShield.addEventListener("change", function(){sheet.shieldEquip(equipShield);});
    equippedArmor.addEventListener(
      "change",
      function(){ sheet.equipArmor(equippedArmor);}
    );
    //document.querySelector("#newCharacterBtn").addEventListener("click", getCharacters);
    document.querySelector("#newCharacterBtn").addEventListener("click", function(){currentUID = utils.ID();});
    dataForm.addEventListener("submit", addCharacter);
    dataForm.addEventListener("submit", getCharacters);
    rollAbilitiesBtn.addEventListener("click", fillAbilityScores);
  };

  window.onload = init;

  export{
    formatDNDURL,
    getDNDInfo,
    fillAbilityScores,
  }