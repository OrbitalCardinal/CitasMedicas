import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

// Angular material imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// Component imports
// Pacientes
import { PacientsComponent } from './pacients/pacients-screen/pacients.component';
import { PacientsModal } from './pacients/pacients-modal/pacients-modal.component';
import { PacientsDeleteModal } from './pacients/pacients-delete-modal/pacients-delete-modal.component';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { Page404Component } from './page404/page404.component';
import { PacientsEditModal } from './pacients/pacients-edit-modal/pacients-edit-modal.component';

// Routes declaration
const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "main", component: MainComponent, children: [
      { path: "", redirectTo: "pacients", pathMatch: "full" },
      { path: "pacients", component: PacientsComponent },
      { path: "doctors", component: DoctorsComponent },
      { path: "appointments", component: AppointmentsComponent }
    ]
  },
  { path: "**", component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    PacientsComponent,
    DoctorsComponent,
    AppointmentsComponent,
    Page404Component,
    PacientsModal,
    PacientsDeleteModal,
    PacientsEditModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [RouterModule.forRoot(routes)],
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [
  ],
  exports: [
    [RouterModule]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
