'use strict';

class BaseStats {
  constructor(hitPoints, attack, defense, specialAttack, specialDefense, speed) {
    this.level = 50;

    this.hitPoints = hitPoints;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;

    this.hitPointsMin = Math.floor((this.hitPoints * 2) * (this.level / 100) + (10 + this.level));
    this.hitPointsNormal = Math.floor(((this.hitPoints * 2) + 31) * (this.level / 100) + (10 + this.level));
    this.hitPointsMax = Math.floor(((this.hitPoints * 2) + 31 + 63) * (this.level / 100) + (10 + this.level));

    this.attackMin = Math.floor(((this.attack * 2) * (this.level / 100) + 5) * 0.9);
    this.attackNormal = Math.floor((((this.attack * 2) + 31 )* (this.level / 100) + 5) * 1.0);
    this.attackMax = Math.floor((((this.attack * 2) + 31 + 63)* (this.level / 100) + 5) * 1.1);

    this.defenseMin = Math.floor(((this.defense * 2) * (this.level / 100) + 5) * 0.9);
    this.defenseNormal = Math.floor((((this.defense * 2) + 31 )* (this.level / 100) + 5) * 1.0);
    this.defenseMax = Math.floor((((this.defense * 2) + 31 + 63)* (this.level / 100) + 5) * 1.1);
    
    this.specialAttackMin = Math.floor(((this.specialAttack * 2) * (this.level / 100) + 5) * 0.9);
    this.specialAttackNormal = Math.floor((((this.specialAttack * 2) + 31 )* (this.level / 100) + 5) * 1.0);
    this.specialAttackMax = Math.floor((((this.specialAttack * 2) + 31 + 63)* (this.level / 100) + 5) * 1.1);

    this.specialDefenseMin = Math.floor(((this.specialDefense * 2) * (this.level / 100) + 5) * 0.9);
    this.specialDefenseNormal = Math.floor((((this.specialDefense * 2) + 31 )* (this.level / 100) + 5) * 1.0);
    this.specialDefenseMax = Math.floor((((this.specialDefense * 2) + 31 + 63)* (this.level / 100) + 5) * 1.1);

    this.speedMin = Math.floor(((this.speed * 2) * (this.level / 100) + 5) * 0.9);
    this.speedNormal = Math.floor((((this.speed * 2) + 31 )* (this.level / 100) + 5) * 1.0);
    this.speedMax = Math.floor((((this.speed * 2) + 31 + 63)* (this.level / 100) + 5) * 1.1);
  }

  getHitPointsString() {
    return `${this.hitPoints}（${this.hitPointsMin}～${this.hitPointsNormal}～${this.hitPointsMax}）`;
  }
  
  getAttackString() {
    return `${this.attack}（${this.attackMin}～${this.attackNormal}～${this.attackMax}）`;
  }

  getDefenseString() {
    return `${this.defense}（${this.defenseMin}～${this.defenseNormal}～${this.defenseMax}）`;
  }

  getSpecialAttackString() {
    return `${this.specialAttack}（${this.specialAttackMin}～${this.specialAttackNormal}～${this.specialAttackMax}）`;
  }

  getSpecialDefenseString() {
    return `${this.specialDefense}（${this.specialDefenseMin}～${this.specialDefenseNormal}～${this.specialDefenseMax}）`;
  }

  getSpeedString() {
    return `${this.speed}（${this.speedMin}～${this.speedNormal}～${this.speedMax}）`;
  }

  getHitPointsShortString() {
    return `${this.hitPoints}`;
  }
  
  getAttackShortString() {
    return `${this.attack}`;
  }
  
  getDefenseShortString() {
    return `${this.defense}`;
  }

  getSpecialAttackShortString() {
    return `${this.specialAttack}`;
  }

  getSpecialDefenseShortString() {
    return `${this.specialDefense}`;
  }

  getSpeedShortString() {
    return `${this.speed}`;
  }
}