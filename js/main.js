'use strict';

{
  class Pokemon {
    constructor(no, name, type, ability, baseStats) {
      this.no = no;
      this.name = name;
      this.type = type;
      this.ability = ability;
      this.baseStats = baseStats;
    }

    getNoString() {
      return `${this.no}`
    }
  }

  const name = document.getElementById("name");
  const no = document.getElementById("no");
  const type = document.getElementById("type");
  const hitPoints  = document.getElementById("hitPoints");
  const attack = document.getElementById("attack");
  const defense = document.getElementById("defense");
  const specialAttack = document.getElementById("specialAttack");
  const specialDefense = document.getElementById("specialDefense");
  const speed = document.getElementById("speed");
  const ability1 = document.getElementById("ability1");
  const ability2 = document.getElementById("ability2");
  const hiddenAbility = document.getElementById("hiddenAbility");
  const weakness = document.getElementById("weakness");
  const weaknessDouble = document.getElementById("weaknessDouble");
  const strong = document.getElementById("strong");
  const strongDouble = document.getElementById("strongDouble");
  const invalid = document.getElementById("invalid");

  name.addEventListener("keyup", e => {
    no.textContent = "";
    type.textContent = "";
    hitPoints.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    ability1.textContent = "";
    ability2.textContent = "";
    hiddenAbility.textContent = "";
    weakness.textContent = "";
    weaknessDouble.textContent = "";
    strong.textContent = "";
    strongDouble.textContent = "";
    invalid.textContent = "";

    PokemonList.forEach(pokemon => {
      if (name.textContent === pokemon.name) {
        no.textContent = pokemon.getNoString();
        type.textContent = pokemon.type.getTypeString();
        hitPoints.textContent = pokemon.baseStats.getHitPointsString();
        attack.textContent = pokemon.baseStats.getAttackString();
        defense.textContent = pokemon.baseStats.getDefenseString();
        specialAttack.textContent = pokemon.baseStats.getSpecialAttackString();
        specialDefense.textContent = pokemon.baseStats.getSpecialDefenseString();
        speed.textContent = pokemon.baseStats.getSpeedString();
        ability1.textContent = pokemon.ability[0].getAbilityString();
        if (pokemon.ability[1] !== undefined) {
          ability2.textContent = pokemon.ability[1].getAbilityString();
        } else {
          ability2.textContent = "---";
        }
        if (pokemon.ability[2] !== undefined) {
          hiddenAbility.textContent = pokemon.ability[2].getAbilityString();
        } else {
          hiddenAbility.textContent = "---";
        }
        weakness.textContent = pokemon.type.getWeaknessString();
        weaknessDouble.textContent = pokemon.type.getWeaknessDoubleString();
        strong.textContent = pokemon.type.getStrongString();
        strongDouble.textContent = pokemon.type.getStrongDoubleString();
        invalid.textContent = pokemon.type.getInvalidString();
      }
    }); 
  });

  const PokemonList = [];
  const AbilityList = [];

  const requestJsonPokemon = new XMLHttpRequest();
  requestJsonPokemon.onreadystatechange = function() {
    if (requestJsonPokemon.readyState === 4 && requestJsonPokemon.status === 200) {
      const json = JSON.parse(requestJsonPokemon.responseText);
      json.forEach(data => {
        let type;
        if (0 < data.type2.length) {
          type = new Type(data.type1, data.type2);
        } else {
          type = new Type(data.type1);
        }

        const abilities = [undefined, undefined, undefined];
        
        if (0 < data.ability1.length) {
          AbilityList.forEach(ability => {
            if (ability.getAbilityShortString() === data.ability1) {
              abilities[0] = ability;
            }
          });
        }

        if (0 < data.ability2.length) {
          AbilityList.forEach(ability => {
            if (ability.getAbilityShortString() === data.ability2) {
              abilities[1] = ability;
            }
          });
        }

        if (0 < data.hiddenAbility.length) {
          AbilityList.forEach(ability => {
            if (ability.getAbilityShortString() === data.hiddenAbility) {
              abilities[2] = ability;
            }
          });
        }

        // 種族値
        const baseStats = new BaseStats(
          data.hitPoints,
          data.attack,
          data.defense,
          data.specialAttack,
          data.specialDefense,
          data.speed
        );

        // ポケモン追加
        PokemonList.push(
          new Pokemon(
            data.no, data.name, type, abilities, baseStats)
        );
      });
    }
  }

  const requestJsonAbility = new XMLHttpRequest();
  requestJsonAbility.onreadystatechange = function() {
    if (requestJsonAbility.readyState === 4 && requestJsonAbility.status === 200) {
      let json = JSON.parse(requestJsonAbility.responseText);
      json.forEach(data => {
        AbilityList.push(
          new Ability(data.name, data.explanation)
        );
      });
      requestJsonPokemon.open("GET", "json/pokemon.json", false);
      requestJsonPokemon.send();
    }
  }
  requestJsonAbility.open("GET", "json/ability.json", false);
  requestJsonAbility.send();
}