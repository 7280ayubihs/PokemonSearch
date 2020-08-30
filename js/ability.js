'use strict';

class Ability {
  constructor(name, explanation) {
    this.name = name;
    this.explanation = explanation;
  }

  getAbilityString() {
    return `${this.name}（${this.explanation}）`;
  }

  getAbilityShortString() {
    return `${this.name}`;
  }
}