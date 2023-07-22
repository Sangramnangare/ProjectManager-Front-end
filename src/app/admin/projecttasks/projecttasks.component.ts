import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-projecttasks',
  templateUrl: './projecttasks.component.html',
  styleUrls: ['./projecttasks.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ProjecttasksComponent implements OnInit {

  id: any;
  moduleid: any;
  projectid: any;
  taskdata: any;
  tasks: any;
  managerid: any;
  projects: any;
  modules: any;

  constructor(private api: ApiService, private rote: ActivatedRoute) {
    this.projectid = rote.snapshot.paramMap.get("projectid");
    this.managerid = rote.snapshot.paramMap.get("managerid");
    this.moduleid = rote.snapshot.paramMap.get("moduleid");
  }

  ngOnInit(): void {
    this.api.get("projects/" + this.projectid).subscribe((result: any) => {
      this.projects = result;
    })
    this.api.get("projectmodules/" + this.moduleid).subscribe((result: any) => {
      this.modules = result;
    })

    this.load();
  }

  load() {
    this.id = null;
    this.taskdata = new FormGroup({
      id: new FormControl(0),
      projectid: new FormControl(this.projectid),
      moduleid: new FormControl(this.moduleid),
      task: new FormControl(""),
      description: new FormControl(""),
      employeeid: new FormControl(this.managerid),
      startdate: new FormControl(""),
      starttime: new FormControl(""),
      enddate: new FormControl(""),
      endtime: new FormControl(""),
      duration: new FormControl(""),
      status: new FormControl(""),
    })

    this.api.get("projectstasks/listtasks/" + this.moduleid).subscribe((result: any) => {
      this.tasks = result;
      console.log(result);

    })
  }

  save(data: any) {
    console.log(data);
    if(this.id == null){
      this.api.post("projectstasks", data).subscribe((result: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project Task Added Successfully 👍',
          showConfirmButton: false,
          timer: 1500
        })
        this.load();
      })
    }
    else{
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.api.put("projectstasks/" + this.id, data).subscribe((result: any) => {
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
      this.api.get("projectstasks/" + id).subscribe((result: any) => {
        this.taskdata.patchValue({
          id: this.id,
          task: result.task,
          description: result.description,
          startdate: result.startdate,
          enddate: result.enddate,
          starttime: result.starttime,
          endtime: result.endtime,
          duration: result.duration,
          status: result.status
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
        this.api.delete("projectstasks/" + id).subscribe((result: any) => {
          Swal.fire(
            'Deleted!',
            'Your Project Task has been deleted.',
            'success'
          )
          this.load();
        })
      }
    })
  }
}
