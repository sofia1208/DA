import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogCompanyComponent } from '../dialog-company/dialog-company.component';

@Component({
  selector: 'app-dialog-add-part',
  templateUrl: './dialog-add-part.component.html',
  styleUrls: ['./dialog-add-part.component.css']
})
export class DialogAddPartComponent implements OnInit {
  companyName: string;
  companyContactPerson: string;
  companyMail: string;
  firstname: string;
  lastname: string;
  mail: string;
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog) { }

  ngOnInit(): void {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  addCompany() {
    this.companyName = "";
    const dialogRef = this.dialog.open(DialogCompanyComponent, {
      width: '400px',
      data: {
       name: this.companyName,
       contactperson: this.companyContactPerson,
        mail: this.companyMail
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.companyName = result.name;
      this.companyContactPerson = result.contactperson;
      this.companyMail = result.mail;

      this.data.companys.push(this.companyName);

    });


  }
}
