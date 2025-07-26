enum TicketType {
  CONCERT,
  MOVIE,
  SPORT,
}

abstract class BaseTicket {
  private basePrice: number;
  private id: number;
  constructor(basePrice: number) {
    this.id = Math.floor(Math.random() * 1000000);
    this.basePrice = basePrice;
  }
  abstract fetchPrice(): number;

  getId(): number {
    return this.id;
  }

  getBasePrice(): number {
    return this.basePrice;
  }
}

class ConcertTicket extends BaseTicket {
  constructor(basePrice: number) {
    super(basePrice);
  }
  
  fetchPrice(): number {
    return this.getBasePrice() * 1.2; 
  }
}

class MovieTicket extends BaseTicket {
  constructor(basePrice: number) {
    super(basePrice);
  }
  
  fetchPrice(): number {
    return this.getBasePrice() * 1.1; 
  }
}

class SportTicket extends BaseTicket {
  constructor(basePrice: number) {
    super(basePrice);
  }
  
  fetchPrice(): number {
    return this.getBasePrice() * 1.5; 
  }
}

class EventEntity {
  private name: string;
  private date: Date;
  private ticketType: TicketType;
  private totalAvailability: number;
  private availability: number;
  private basePrice: number;

  constructor(
    name: string,
    date: Date,
    ticketType: TicketType,
    totalAvailability: number,
    basePrice: number 
  ) {
    this.name = name;
    this.date = date;
    this.ticketType = ticketType;
    this.availability = totalAvailability;
    this.totalAvailability = totalAvailability;
    this.basePrice = basePrice;
  }

  getAvailability(): number {
    return this.availability;
  }

  createTicket(): BaseTicket {
    switch (this.ticketType) {
      case TicketType.CONCERT:
        return new ConcertTicket(this.basePrice);
      case TicketType.MOVIE:
        return new MovieTicket(this.basePrice);
      case TicketType.SPORT:
        return new SportTicket(this.basePrice);
      default:
        throw new Error("Invalid ticket type");
    }
  }

  bookTicket(): BaseTicket {
    if (this.availability <= 0) {
      throw new Error("No tickets available");
    }
    const ticket = this.createTicket();
    if (ticket) {
      this.availability--;
      return ticket;
    }
    throw new Error("Ticket booking failed");
  }
}

const concert = new EventEntity(
  "Rock Concert",
  new Date("2023-12-01"),
  TicketType.CONCERT,
  100,
  100
);

const ticket = concert.bookTicket();
console.log(ticket.getId(), ticket.fetchPrice(), concert.getAvailability()); 



// class Ticket {
//   private type: TicketType;
//   private basePrice: number;
//   constructor(type: TicketType, basePrice: number) {
//     this.type = type;
//     this.basePrice = basePrice;
//   }

//   private fetchConcertPrice(): number {
//     // strategy
//   }

//   private fetchMoviePrice(): number {
//     // strategy
//   }

//   private fetchSportPrice(): number {
//     // strategy
//   }

//   fetchPrice(): number {
//     switch (this.type) {
//       case TicketType.CONCERT:
//         return this.fetchConcertPrice();
//       case TicketType.MOVIE:
//         return this.fetchMoviePrice();
//       case TicketType.SPORT:
//         return this.fetchSportPrice();
//       default:
//         throw new Error("Invalid ticket type");
//     }
//   }
// }