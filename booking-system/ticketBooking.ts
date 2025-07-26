/**
 * We’re building a platform that sells tickets for various events — movies, concerts, sports, etc.
 * Each event type can have different pricing rules. 
 * Your task is to design a system that allows selling tickets in a scalable way,
 * so that adding new event types in the future doesn’t require rewriting core logic.
 *
 * Your responsibilities:
 *
 * - Design the object-oriented structure.
 * - Use design patterns where necessary.
 * - Support for booking and pricing.
 * - Prioritize scalability and clean code.
 */

enum TicketType {
  CONCERT,
  MOVIE,
  SPORT,
}

/** Strategy Pattern ( Behavioural ) */
interface PricingStrategy {
  fetchPrice(basePrice: number): number;
}

class DiscountPricingStrategy implements PricingStrategy {
  fetchPrice(basePrice: number): number {
    return basePrice * 0.9; // 10% discount
  }
}

class PremiumPricingStrategy implements PricingStrategy {
  fetchPrice(basePrice: number): number {
    return basePrice * 1.2; // 20% premium
  }
}

abstract class BaseTicket {
  private id: number;
  constructor(private basePrice: number, private strategy: PricingStrategy) {
    this.id = Math.floor(Math.random() * 1000000);
  }

  getId(): number {
    return this.id;
  }

  getBasePrice(): number {
    return this.basePrice;
  }

  getPrice(): number {
    return this.strategy.fetchPrice(this.basePrice);
  }
}

class ConcertTicket extends BaseTicket {}
class MovieTicket extends BaseTicket {}
class SportTicket extends BaseTicket {}

// Factory Pattern ( Creational )

interface TicketFactory {
  createTicket(basePrice: number): BaseTicket;
}

class ConcertTicketFactory implements TicketFactory {
  createTicket(basePrice: number): BaseTicket {
    return new ConcertTicket(basePrice, new DiscountPricingStrategy());
  }
}

class MovieTicketFactory implements TicketFactory {
  createTicket(basePrice: number): BaseTicket {
    return new MovieTicket(basePrice, new DiscountPricingStrategy());
  }
}

class SportTicketFactory implements TicketFactory {
  createTicket(basePrice: number): BaseTicket {
    return new SportTicket(basePrice, new DiscountPricingStrategy());
  }
}

class TicketFactoryRegistry {
  private factories: Map<TicketType, TicketFactory> = new Map();

  register(ticketType: TicketType, factory: TicketFactory): void {
    this.factories.set(ticketType, factory);
  }

  getFactory(ticketType: TicketType): TicketFactory {
    const factory = this.factories.get(ticketType);
    if (!factory) {
      throw new Error(`No factory registered for ${TicketType[ticketType]}`);
    }
    return factory;
  }
}

// Booking System ( Context )
class EventEntity {
  private availability: number;
  constructor(
    private name: string,
    private date: Date,
    private ticketType: TicketType,
    private totalAvailability: number,
    private basePrice: number,
    private ticketFactoryRegistry: TicketFactoryRegistry
  ) {
    this.availability = totalAvailability;
  }

  getAvailability(): number {
    return this.availability;
  }

  bookTicket(): BaseTicket {
    if (this.availability <= 0) {
      throw new Error("No tickets available");
    }
    const factory = this.ticketFactoryRegistry.getFactory(this.ticketType);
    const ticket = factory.createTicket(this.basePrice);

    if (ticket) {
      this.availability--;
      return ticket;
    }
    throw new Error("Ticket booking failed");
  }
}

const registry = new TicketFactoryRegistry();
registry.register(TicketType.CONCERT, new ConcertTicketFactory());
registry.register(TicketType.MOVIE, new MovieTicketFactory());
registry.register(TicketType.SPORT, new SportTicketFactory());

const concert = new EventEntity(
  "Live Concert",
  new Date("2023-12-01"),
  TicketType.CONCERT,
  100,
  50,
  registry
);

const ticket = concert.bookTicket();
