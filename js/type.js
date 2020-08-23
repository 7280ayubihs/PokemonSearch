'use strict';

/**
 * タイプと数値の対応を示す。
 */
const typeCodeMap = {
  "ノーマル":0,
  "ほのお":1,
  "みず":2,
  "でんき":3,
  "くさ":4,
  "こおり":5,
  "かくとう":6,
  "どく":7,
  "じめん":8,
  "ひこう":9,
  "エスパー":10,
  "むし":11,
  "いわ":12,
  "ゴースト":13,
  "ドラゴン":14,
  "あく":15,
  "はがね":16,
  "フェアリー":17,
};

/**
 * タイプ相性を示す。
 * n:[weakness, strong, invalid] の並び順です。
 * 中の数値は、typeCodeMap に対応しています。
 */
const typeCompatibilityMap = {
  0:[[6], [], [13]],
  1:[[2,8,12], [1,4,5,11,16,17], []],
  2:[[3,4], [1,2,5,16], []],
  3:[[8], [3,9,16], []],
  4:[[1,5,7,9,11], [2,3,4,8], []],
  5:[[1,6,12,16], [5], []],
  6:[[9,10,17], [11,12,15], []],
  7:[[8,10], [4,6,7,11,17], []],
  8:[[2,4,5], [7,12], [3]],
  9:[[3,5,12], [4,6,11], [8]],
  10:[[11,13,15], [6,10], []],
  11:[[1,9,12], [4,6,8], []],
  12:[[2,4,6,8,16], [0,1,7,9], []],
  13:[[13,15], [7,11], [0,6]],
  14:[[5,14,17], [1,2,3,4], []],
  15:[[6,11,17], [13,15], [10]],
  16:[[1,6,8], [0,4,5,9,10,11,12,14,16,17], [7]],
  17:[[7,16], [6,11,15], [14]],
};

/**
 * タイプに関する情報を扱うクラスです。
 */
class Type {
  /**
   * コンストラクタ
   * @param {string} type1 第１タイプ（必須）
   * @param {string} type2 第２タイプ（複合タイプではない場合は、未指定 or undefined）
   */
  constructor(type1, type2) {
    this.type1 = type1;
    this.type2 = type2;
    this.typeCode1 = typeCodeMap[type1];
    if (this.type2 === undefined) {
      this.typeCode2 = undefined;
    } else {
      this.typeCode2 = typeCodeMap[type2];
    }
    this.setupCompatibility();
  }

  /** 
   * タイプ相性を設定する
   */
  setupCompatibility() {
    this.weaknessDouble = [];
    this.weakness = typeCompatibilityMap[this.typeCode1][0].concat();
    this.strong = typeCompatibilityMap[this.typeCode1][1].concat();
    this.invalid = typeCompatibilityMap[this.typeCode1][2].concat();
    this.strongDouble = [];

    if (this.type2 === undefined) {
      return;
    }

    // ------------------------------ //
    //    以降、複合タイプ時の処理    //
    // ------------------------------ //

    // 第２タイプの弱点を反映
    typeCompatibilityMap[this.typeCode2][0].forEach(weakness => {
      if (0 <= this.weakness.indexOf(weakness)) {
        this.weaknessDouble.push(weakness);
        this.weakness.splice(this.weakness.indexOf(weakness), 1);
      } else if (0 <= this.strong.indexOf(weakness)) {
        this.strong.splice(this.strong.indexOf(weakness), 1);
      } else if (0 <= this.invalid.indexOf(weakness)) {
        // do nothing.
      } else {
        this.weakness.push(weakness);
      }
    });

    // 第２タイプの半減を反映
    typeCompatibilityMap[this.typeCode2][1].forEach(strong => {
      if (0 <= this.weakness.indexOf(strong)) {
        this.weakness.splice(this.weakness.indexOf(strong), 1);
      } else if (0 <= this.strong.indexOf(strong)) {
        this.strongDouble.push(strong);
        this.strong.splice(this.strong.indexOf(strong), 1);
      } else if (0 <= this.invalid.indexOf(strong)) {
        // do nothing.
      } else {
        this.strong.push(strong);
      }
    });

    // 第２タイプの無効を反映
    typeCompatibilityMap[this.typeCode2][2].forEach(invalid => {
      if (0 <= this.weakness.indexOf(invalid)) {
        this.weakness.splice(this.weakness.indexOf(invalid), 1);
      } else if (0 <= this.strong.indexOf(invalid)) {
        this.strong.splice(this.strong.indexOf(invalid), 1);
      }
      this.invalid.push(invalid);
    });

    // 順番を昇順にソート
    let cf = (a, b) => a - b;
    this.weaknessDouble.sort(cf);
    this.weakness.sort(cf);
    this.strong.sort(cf);
    this.strongDouble.sort(cf);
    this.invalid.sort(cf);
  }
  
  /**
   * @return {string} タイプを文字列で返す。複合タイプの場合"／"で区切られる。
   */
  getTypeString() {
    if (this.type2 === undefined) {
      return `${this.type1}`;
    }
    return `${this.type1}／${this.type2}`;
  }

  /**
   * @return {string} ２重弱点タイプを文字列で返す。タイプは"／"で区切られる。
   */
  getWeaknessDoubleString() {
    if (this.weaknessDouble.length === 0) {
      return "---";
    }
    let str = "";
    this.weaknessDouble.forEach((weakness, index) => {
      str = str + Object.keys(typeCodeMap).filter(key => typeCodeMap[key] == weakness)[0];
      if (index !== this.weaknessDouble.length - 1) {
        str = str + "／";
      }
    });
    return str;
  }

  /**
   * @return {string} 弱点タイプを文字列で返す。タイプは"／"で区切られる。
   */
  getWeaknessString() {
    if (this.weakness.length === 0) {
      return "---";
    }
    let str = "";
    this.weakness.forEach((weakness, index) => {
      str = str + Object.keys(typeCodeMap).filter(key => typeCodeMap[key] == weakness)[0];
      if (index !== this.weakness.length - 1) {
        str = str + "／";
      }
    });
    return str;
  }

  /**
   * @return {string} 半減タイプを文字列で返す。タイプは"／"で区切られる。
   */
  getStrongString() {
    if (this.strong.length === 0) {
      return "---";
    }
    let str = "";
    this.strong.forEach((strong, index) => {
      str = str + Object.keys(typeCodeMap).filter(key => typeCodeMap[key] == strong)[0];
      if (index !== this.strong.length - 1) {
        str = str + "／";
      }
    });
    return str;
  }

  /**
   * @return {string} ２重半減タイプを文字列で返す。タイプは"／"で区切られる。
   */
  getStrongDoubleString() {
    if (this.strongDouble.length === 0) {
      return "---";
    }
    let str = "";
    this.strongDouble.forEach((strong, index) => {
      str = str + Object.keys(typeCodeMap).filter(key => typeCodeMap[key] == strong)[0];
      if (index !== this.strongDouble.length - 1) {
        str = str + "／";
      }
    });
    return str;
  }

  /**
   * @return {string} 無効タイプを文字列で返す。タイプは"／"で区切られる。
   */
  getInvalidString() {
    if (this.invalid.length === 0) {
      return "---";
    }
    let str = "";
    this.invalid.forEach((invalid, index) => {
      str = str + Object.keys(typeCodeMap).filter(key => typeCodeMap[key] == invalid)[0];
      if (index !== this.invalid.length - 1) {
        str = str + "／";
      }
    });
    return str;
  }
}