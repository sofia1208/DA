import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-saving',
  templateUrl: './dialog-saving.component.html',
  styleUrls: ['./dialog-saving.component.css']
})
export class DialogSavingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSavingComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.data.saved = false;
    this.dialogRef.close();
  }
  saved() {
    this.data.saved = true;
  }

}
