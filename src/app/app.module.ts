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
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';

// Component imports
// Pacientes
import { PacientsComponent } from './pacients/pacients-screen/pacients.component';
import { PacientsModal } from './pacients/pacients-modal/pacients-modal.component';
import { PacientsDeleteModal } from './pacients/pacients-delete-modal/pacients-delete-modal.component';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DoctorsComponent } from './doctors/doctors-screen/doctors.component';
import { Page404Component } from './page404/page404.component';
import { PacientsEditModal } from './pacients/pacients-edit-modal/pacients-edit-modal.component';
import { DoctorsDeleteModal } from './doctors/doctors-delete-modal/doctors-delete-modal.component';
import { DoctorsEditModal } from './doctors/doctors-edit-modal/doctors-edit-modal.component';
import { DoctorsModal } from './doctors/doctors-modal/doctors-modal.component';
import { AreaModalComponent } from './area/area-modal/area-modal.component';
import { CitasComponent } from './citas/citas-screen/citas.component';
import { CitasDeleteModal } from './citas/citas-delete-modal/citas-delete-modal.component';
import { CitasModal } from './citas/citas-modal/citas-modal.component';

// Routes declaration
const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "main", component: MainComponent, children: [
      { path: "", redirectTo: "pacients", pathMatch: "full" },
      { path: "pacients", component: PacientsComponent },
      { path: "doctors", component: DoctorsComponent },
      { path: "appointments", component: CitasComponent }
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
    Page404Component,
    PacientsModal,
    PacientsDeleteModal,
    PacientsEditModal,
    DoctorsDeleteModal,
    DoctorsEditModal,
    DoctorsModal,
    AreaModalComponent,
    CitasComponent,
    CitasDeleteModal,
    CitasModal
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
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
  ],
  exports: [
    [RouterModule]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
