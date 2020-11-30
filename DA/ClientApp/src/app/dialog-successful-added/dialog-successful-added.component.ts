import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-successful-added',
  templateUrl: './dialog-successful-added.component.html',
  styleUrls: ['./dialog-successful-added.component.css']
})
export class DialogSuccessfulAddedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSuccessfulAddedComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
