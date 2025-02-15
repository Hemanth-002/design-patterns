/**
 * The Observer Pattern defines a one-to-many dependency between objects so that when one
    object changes state, all of its dependents are
    notified and updated automatically.
 */

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObserver(observer: Observer): void;
}

class WeatherData implements Subject {
  private observers: Observer[] = []; // Store observers
  private temperature: number;
  private humidity: number;
  private pressure: number;

  // Implementing the methods from Subject interface
  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObserver(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  // Example methods to set weather data
  setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsChanged();
  }

  measurementsChanged() {
    this.notifyObserver();
  }

  // Getters for weather data
  getTempratue(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
  }

  getPressure(): number {
    return this.pressure;
  }
}

interface Observer {
  update(): void;
}

interface Display {
  display(): void;
}

class CurrentConditionsDisplay implements Observer {
  private weatherdata = new WeatherData(); // WeatherData instance
  private temperature: number; // Store temperature
  private humidity: number; // Store humidity

  registerObserver() {
    this.weatherdata.addObserver(this);
  }

  update(): void {
    this.temperature = this.weatherdata.getTempratue(); // Get latest temperature
    this.humidity = this.weatherdata.getHumidity(); // Get latest humidity
    // Logic to update display with new weather data
    console.log(
      `Current conditions: ${this.temperature}°C and ${this.humidity}% humidity`
    );
  }
}

class StatisticsDisplay implements Observer {
  update(): void {
    // Logic to update statistics display
  }
}

class ForecastDisplay implements Observer {
  update(): void {
    // Logic to update forecast display
  }
}
