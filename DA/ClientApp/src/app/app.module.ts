import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }from '@angular/common/http';
import {Routes, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { LOCALE_ID } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { MatTableModule } from '@angular/material/table'
import { MatGridListModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { BackendStartComponent } from './backend-start/backend-start.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BackendDetailComponent } from './backend-detail/backend-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DialogOrganizerComponent } from './dialog-organizer/dialog-organizer.component';
import { DialogCompanyComponent } from './dialog-company/dialog-company.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { DialogMoreEventsComponent } from './dialog-more-events/dialog-more-events.component';
import { AuthGuard } from './login/AuthGuard';
import { DialogAddPartComponent } from './dialog-add-part/dialog-add-part.component';
import { DialogSavingComponent } from './dialog-saving/dialog-saving.component';
registerLocaleData(localDe, 'de');
const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'start', component: BackendStartComponent, canActivate: [AuthGuard] },
  { path: 'start', component: BackendStartComponent },
  { path: 'detail', component: BackendDetailComponent },
  { path: 'checkout', component: RegistrationSuccessComponent },
  {
    path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent }
    ]
  },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' }
];
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
    LoginComponent,
    BackendStartComponent,
    BackendDetailComponent,
    DialogComponentComponent,
    DialogOrganizerComponent,
    DialogCompanyComponent,
    RegistrationSuccessComponent,
    DialogMoreEventsComponent,
    DialogAddPartComponent,
    DialogSavingComponent,
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
   HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE1t4KEfa0sBR2N354rup1xE6LvDlXabE',
   
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
   // MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  exports: [RouterModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: LOCALE_ID, useValue: "de" }, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponentComponent, DialogOrganizerComponent, DialogCompanyComponent, DialogMoreEventsComponent, DialogAddPartComponent, DialogSavingComponent
  ] 
})
export class AppModule { }
