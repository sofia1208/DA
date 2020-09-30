import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-more-events',
  templateUrl: './dialog-more-events.component.html',
  styleUrls: ['./dialog-more-events.component.css']
})
export class DialogMoreEventsComponent implements OnInit {
  eventId: Number;
  events: CustomEvent[] = [];
  constructor(private dialogRef: MatDialogRef<DialogMoreEventsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.events = data.events;
  }
  ngOnInit() {
    console.log(this.events);
  }
  close() {
    this.dialogRef.close({ event: 'close', data: this.eventId });
  }
  onClicked(event: any) {
    this.eventId = event.id;
    this.dialogRef.close({ event: 'close', data: this.eventId });
  }

}
