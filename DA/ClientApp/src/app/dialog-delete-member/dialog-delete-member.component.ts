import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-delete-member',
  templateUrl: './dialog-delete-member.component.html',
  styleUrls: ['./dialog-delete-member.component.css']
})
export class DialogDeleteMemberComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
