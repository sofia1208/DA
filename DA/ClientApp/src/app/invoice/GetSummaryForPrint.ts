export class GetSummaryForPrint {
  name: string;
  city: string;
  startDate: Date;
  endDate: Date;
  price: Number;
  organizer: string;

  constructor(name: string, city: string, startDate: Date, endDate: Date, price: Number, organizer: string) {
    this.city = city;
    this.endDate = endDate;
    this.organizer = organizer;
    this.startDate = startDate;
    this.price = price;
    this.name = name;

  }
}
