abstract class Beverage {
  milk: boolean = false;
  whip: boolean = false;

  setWhip() {
    this.whip = true;
  }
  setMilk() {
    this.milk = true;
  }

  cost() {
    console.log(this.milk, this.whip);
    let sum = 0;
    if (this.milk) sum += 1.5;
    if (this.whip) sum += 2;
    return sum;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this.setMilk();
    this.setWhip();
  }
  cost(): number {
    return 5 + super.cost();
  }
}

const cofee = new DarkRoast();
console.log(cofee.cost());
