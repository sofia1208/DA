import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {
  descr: string = "";
  constructor(private dialogRef: MatDialogRef<DialogComponentComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.descr = data.name;
  }

  ngOnInit() {
    
  }
  close() {
    this.dialogRef.close();
  }
}
