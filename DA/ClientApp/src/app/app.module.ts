import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }from '@angular/common/http';
import {Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localDe from '@angular/common/locales/de';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { LOCALE_ID } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { MatTableModule } from '@angular/material/table'
import { MatGridListModule } from '@angular/material'
import { AgmCoreModule } from '@agm/core';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { InvoiceComponent } from './invoice/invoice.component';

registerLocaleData(localDe, 'de');
const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent }
    ]
  }];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CalendarComponent,
    RegistrationComponent,
    PrintLayoutComponent,
    InvoiceComponent,
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
   HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE1t4KEfa0sBR2N354rup1xE6LvDlXabE',
   
    }),
 
    RouterModule.forRoot(routes),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
   // MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  exports: [RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: "de" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
