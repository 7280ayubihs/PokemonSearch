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

  // 自動化（json or csv からロードする）
  const PokemonList = [
    new Pokemon(1, "フシギダネ", new Type("くさ", "どく")),
    new Pokemon(4, "ヒトカゲ", new Type("ほのお")),
    new Pokemon(6, "リザードン", new Type("ほのお", "ひこう")),
    new Pokemon(7, "ゼニガメ", new Type("みず")),
    new Pokemon(25, "ピカチュウ", new Type("でんき")),
    new Pokemon(151, "ミュウツー", new Type("エスパー")),
    new Pokemon(151, "ミュウ", new Type("エスパー")),
  ];
}