import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-organizer',
  templateUrl: './dialog-organizer.component.html',
  styleUrls: ['./dialog-organizer.component.css']
})
export class DialogOrganizerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOrganizerComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
