// Design a parking lot system that supports the following requirements:
// Functional Requirements:

// The parking lot has multiple levels, and each level has a fixed number of slots.

// A parking slot can accommodate different types of vehicles: motorcycle, car, or truck.

// Vehicles can park only in slots that fit their size:

// Motorcycle can park in motorcycle slots, compact slots, or large slots.

// Car can park in compact slots or large slots.

// Truck can park only in large slots.

// The system should be able to:
// Park a vehicle.
// Unpark a vehicle.
// Check if the parking lot is full.
// Display available slots per level and type.
// The parking lot should optimize the use of space (e.g., prioritize smaller slots for smaller vehicles).

enum VehicleType {
  motorcycle,
  car,
  truck,
}

interface Vehicle {
  type: VehicleType;
  plateNo: string;
}

enum SlotType {
  motorcycle,
  compact,
  large,
}

interface ParkingSlot {
  type: SlotType;
  isOccupied: boolean;
  vehicle?: Vehicle;
}

class ParkingSpace implements ParkingSlot {
  type: SlotType;
  isOccupied: boolean;
  vehicle?: Vehicle;

  constructor(type: SlotType) {
    this.type = type;
  }

  parkVehicle(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  unparkVehicle() {
    this.isOccupied = false;
    this.vehicle = undefined;
  }
}

class ParkingLevel {
  slots: ParkingSpace[];

  constructor(
    compactCount: number,
    largeCount: number,
    motorCycleCount: number
  ) {
    this.slots = [
      ...Array.from(
        { length: compactCount },
        () => new ParkingSpace(SlotType.compact)
      ),
      ...Array.from(
        { length: largeCount },
        () => new ParkingSpace(SlotType.large)
      ),
      ...Array.from(
        { length: motorCycleCount },
        () => new ParkingSpace(SlotType.motorcycle)
      ),
    ];
  }

  isFilled() {
    this.slots.every((slot) => slot.isOccupied);
  }

  findAvailableSlot(vehicleType: VehicleType): ParkingSpace | null {
    for (let slot of this.slots) {
      if (!slot.isOccupied) {
        if (vehicleType === VehicleType.motorcycle) {
          return slot;
        } else if (
          vehicleType === VehicleType.car &&
          slot.type !== SlotType.motorcycle
        ) {
          return slot;
        } else if (
          vehicleType === VehicleType.truck &&
          slot.type === SlotType.large
        ) {
          return slot;
        }
      }
    }
    return null;
  }

  displayAvailableSlots() {
    let motorcycleSlots = 0;
    let compactSlots = 0;
    let largeSlots = 0;

    for (let slot of this.slots) {
      if (!slot.isOccupied) {
        if (slot.type === SlotType.motorcycle) {
          motorcycleSlots++;
        } else if (slot.type === SlotType.compact) {
          compactSlots++;
        } else if (slot.type === SlotType.large) {
          largeSlots++;
        }
      }
    }

    console.log(
      `Available slots: Motorcycle=${motorcycleSlots}, Compact=${compactSlots}, Large=${largeSlots}`
    );
  }
}

class ParkingLot {
  levels: ParkingLevel[];
}
