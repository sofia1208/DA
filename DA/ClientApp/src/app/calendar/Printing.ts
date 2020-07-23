import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

export class Printing {
  active = false;
  constructor(private router: Router) { }
  printDoct(docutmentName: string, documentData: string[]) {
    this.active = true;
    this.router.navigate(['/', {
      outlets: {
        'print': ['print', docutmentName, documentData.join()]
      }
    }]);
  }
  onDataReady() {
    setTimeout(() => {
      window.print();
      this.active = false;
      this.router.navigate([{ outlets: { print: null } }]);
    })
  }

}
