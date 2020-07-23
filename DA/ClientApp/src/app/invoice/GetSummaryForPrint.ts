export class GetSummaryForPrint {
  type: string;
  city: string;
  startDate: Date;
  endDate: Date;
  price: Number;
  organizer: string;
  constructor(type: string, city: string, startDate: Date, endDate: Date, price: Number, organizer: string) {
    this.city = city;
    this.endDate = endDate;
    this.organizer = organizer;
    this.startDate = startDate;
    this.price = price;
    this.type = type;

  }
}
