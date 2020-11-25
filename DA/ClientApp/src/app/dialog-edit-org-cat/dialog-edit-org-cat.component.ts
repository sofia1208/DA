import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-edit-org-cat',
  templateUrl: './dialog-edit-org-cat.component.html',
  styleUrls: ['./dialog-edit-org-cat.component.css']
})
export class DialogEditOrgCatComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogEditOrgCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
