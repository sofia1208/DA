export class SummaryDto {
  name: string;
  start: Date;
  end: Date;
  id: Number;
  display: boolean;
  highlight: boolean = false;
  constructor(name: string, start: Date, end: Date, id: Number, display: boolean) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.id = id;
    this.display = display;
   

  }
}
