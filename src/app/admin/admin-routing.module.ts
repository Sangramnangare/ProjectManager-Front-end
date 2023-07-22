import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectmoduleComponent } from './projectmodule/projectmodule.component';
import { ProjecttasksComponent } from './projecttasks/projecttasks.component';
import { MytasksComponent } from './mytasks/mytasks.component';
import { WorkreportsComponent } from './workreports/workreports.component';

const routes: Routes = [
  {path:"",component:LandingComponent , children:[
    {path:"dashboard" , component:DashboardComponent},
    {path:"employees" , component:EmployeesComponent},
    {path:"projects" , component:ProjectsComponent},
    {path:"projectmodules" , component:ProjectmoduleComponent},
    {path:"projects/projectmodules/:projectid/:managerid" , component:ProjectmoduleComponent},
    {path:"projects/projectmodules/:projectid/:managerid/projecttasks/:moduleid" , component:ProjecttasksComponent},
    {path:"mytasks" , component:MytasksComponent},
    {path:"reports" , component:WorkreportsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
