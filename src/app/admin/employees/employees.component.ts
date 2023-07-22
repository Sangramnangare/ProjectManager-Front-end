import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  id: any;
  formdata: any;
  employees: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = null;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(""),
      code: new FormControl(""),
      gender: new FormControl(""),
      mobileno: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
    })

    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
    })
  }

  save(data: any) {
    console.log(data);
    if (this.id == null) {
      this.api.post("employees", data).subscribe((result: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Employee Added Successfully 👍',
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
          this.api.put("employees/" + this.id, data).subscribe((result: any) => {
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
    if (this.id != null) {
      this.api.get("employees/" + id).subscribe((result: any) => {
        console.log(result);
        this.formdata.patchValue({
          id: this.id,
          name: result.name,
          code: result.code,
          gender: result.gender,
          mobileno: result.mobileno,
          email: result.email,
          password: result.password,
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
        this.api.delete("employees/" + id).subscribe((result: any) => {
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          )
          this.load();
        })
      }
    })
  }
}
