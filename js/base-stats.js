'use strict';

class BaseStats {
  constructor(hitPoints, attack, defense, specialAttack, specialDefense, speed) {
    this.hitPoints = hitPoints;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }

  getHitPointsString() {
    return `${this.hitPoints}`;
  }
  
  getAttackString() {
    return `${this.attack}`;
  }

  getDefenseString() {
    return `${this.defense}`;
  }

  getSpecialAttackString() {
    return `${this.specialAttack}`;
  }

  getSpecialDefenseString() {
    return `${this.specialDefense}`;
  }

  getSpeedString() {
    return `${this.speed}`;
  }
}