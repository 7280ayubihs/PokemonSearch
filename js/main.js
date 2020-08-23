'use strict';

{
  class Pokemon {
    constructor(no, name, type) {
      this.no = no;
      this.name = name;
      this.type = type;
    }
  }

  const name = document.getElementById("name");
  name.addEventListener("keyup", e => {
    const type = document.getElementById("type");
    const weakness = document.getElementById("weakness");
    const weaknessDouble = document.getElementById("weaknessDouble");
    const strong = document.getElementById("strong");
    const strongDouble = document.getElementById("strongDouble");
    const invalid = document.getElementById("invalid");
    
    type.textContent = "";
    weakness.textContent = "";
    weaknessDouble.textContent = "";
    strong.textContent = "";
    strongDouble.textContent = "";
    invalid.textContent = "";

    PokemonList.forEach(pokemon => {
      if (name.textContent === pokemon.name) {
        type.textContent = pokemon.type.getTypeString();
        weakness.textContent = pokemon.type.getWeaknessString();
        weaknessDouble.textContent = pokemon.type.getWeaknessDoubleString();
        strong.textContent = pokemon.type.getStrongString();
        strongDouble.textContent = pokemon.type.getStrongDoubleString();
        invalid.textContent = pokemon.type.getInvalidString();
      }
    }); 
  });
  
  const PokemonList = [];
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      const json = JSON.parse(request.responseText);
      json.forEach(data => {
        let type;
        if (0 < data.type2.length) {
          type = new Type(data.type1, data.type2);
        } else {
          type = new Type(data.type1);
        }
        PokemonList.push(
          new Pokemon(
            parseInt(data.no),
            data.name,
            type)
        );
      });
    }
  }
  request.open("GET", "json/pokemon.json", false);
  request.send();
}