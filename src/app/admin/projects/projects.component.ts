import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ProjectsComponent implements OnInit {

  id: any;
  projectdata: any;
  projects: any;
  employees: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = null;
    this.projectdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      description: new FormControl(""),
      startdate: new FormControl(""),
      targetdate: new FormControl(""),
      managerid: new FormControl(0),
    })

    this.api.get("projects/listproject").subscribe((result: any) => {
      this.projects = result;
    })

    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
    })
  }

  save(data: any) {
    if (this.id == null) {
      this.api.post("projects", data).subscribe((result: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project Added Successfully 👍',
          showConfirmButton: false,
          timer: 1500
        })
        this.load();
      })
    }
    else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.api.put("projects/" + this.id, data).subscribe((result: any) => {
            Swal.fire('Saved!', '', 'success')
            this.load();
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }

  Edit(id: number) {
    this.id = id;
    if (id != null) {
      this.api.get("projects/" + id).subscribe((result: any) => {
        this.projectdata.patchValue({
          id: this.id,
          name: result.name,
          description: result.description,
          startdate: result.startdate,
          targetdate: result.targetdate,
          managerid: result.managerid
        })
      })
    }
  }

  Delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("projects/" + id).subscribe((result) => {
          Swal.fire(
            'Deleted!',
            'Your Project has been deleted.',
            'success'
          )
          this.load();
        })
      }
    })
  }
}
