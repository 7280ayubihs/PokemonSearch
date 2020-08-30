'use strict';

{
  class Pokemon {
    constructor(no, name, type, ability) {
      this.no = no;
      this.name = name;
      this.type = type;
      this.ability = ability;
    }

    getNoString() {
      return `${this.no}`
    }
  }

  const name = document.getElementById("name");
  const no = document.getElementById("no");
  const type = document.getElementById("type");
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
        PokemonList.push(
          new Pokemon(
            data.no, data.name, type, abilities)
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