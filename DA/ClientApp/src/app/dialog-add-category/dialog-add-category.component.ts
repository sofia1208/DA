import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-add-category',
  templateUrl: './dialog-add-category.component.html',
  styleUrls: ['./dialog-add-category.component.css']
})
export class DialogAddCategoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
