import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projectmodule',
  templateUrl: './projectmodule.component.html',
  styleUrls: ['./projectmodule.component.css']
})
export class ProjectmoduleComponent implements OnInit {

  id: any;
  moduledata: any;
  modules: any;
  projects: any;
  projectid: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.projectid = this.route.snapshot.paramMap.get("projectid");
  }

  ngOnInit(): void {
    this.api.get("projects/" + this.projectid).subscribe((result: any) => {
      this.projects = result;
    })

    this.load();
  }

  load() {
    this.id = null;
    this.moduledata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      projectid: new FormControl(this.projectid)
    })

    this.api.get("projectmodules/listmodulesbyid/" + this.projectid).subscribe((result: any) => {
      this.modules = result;
    })
  }

  save(data: any) {
    if (this.id == null) {
      this.api.post("projectmodules", data).subscribe((result: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Project Module Added Successfully 👍',
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
          this.api.put("projectmodules/" + this.id, data).subscribe((result: any) => {
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
      this.api.get("projectmodules/" + id).subscribe((result: any) => {
        this.moduledata.patchValue({
          id: result.id,
          name: result.name,
          projectid: result.projectid
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
        this.api.delete("projectmodules/" + id).subscribe((result: any) => {
          Swal.fire(
            'Deleted!',
            'Your Project Module has been deleted.',
            'success'
          )
          this.load();
        })
      }
    })
  }
}
