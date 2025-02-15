/** 
 * The Strategy Pattern defines a family of algorithms,
encapsulates each one, and makes them interchangeable.
Strategy lets the algorithm vary independently from
clients that use it.*/

// Abstract Character class
abstract class Character {
  weaponBehavior: WeaponBehavior;

  abstract fight(): void;

  setWeapon(weaponBehavior: WeaponBehavior) {
    this.weaponBehavior = weaponBehavior;
  }
}

// Concrete character classes
class Queen extends Character {
  fight(): void {
    this.weaponBehavior.useWeapon();
  }

  constructor() {
    super();
    this.weaponBehavior = new KnifeBehavior();
  }
}

// WeaponBehavior interface
interface WeaponBehavior {
  useWeapon(): void;
}

// Concrete WeaponBehavior classes
class KnifeBehavior implements WeaponBehavior {
  useWeapon(): void {
    console.log("Using a knife.");
  }
}

class BowAndArrowBehavior implements WeaponBehavior {
  useWeapon(): void {
    console.log("Using a bow and arrow.");
  }
}

class AxeBehavior implements WeaponBehavior {
  useWeapon(): void {
    console.log("Using an axe.");
  }
}

class SwordBehavior implements WeaponBehavior {
  useWeapon(): void {
    console.log("Using a sword.");
  }
}
