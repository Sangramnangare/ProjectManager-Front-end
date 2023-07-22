import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';


import { AdminRoutingModule } from './admin-routing.module';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectmoduleComponent } from './projectmodule/projectmodule.component';
import { ProjecttasksComponent } from './projecttasks/projecttasks.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { WorkreportsComponent } from './workreports/workreports.component';


@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    EmployeesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProjectsComponent,
    ProjectmoduleComponent,
    ProjecttasksComponent,
    MytasksComponent,
    WorkreportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MomentDateModule,
    MatSelectModule
  ]
})
export class AdminModule { }
