import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: ['./mytasks.component.css']
})
export class MytasksComponent implements OnInit {

  mytasks: any;
  mytask: any;
  employeeid: any;
  Check = true;
  taskid: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.employeeid = localStorage.getItem("id")

    this.load();
  }
  load() {

    this.api.get("projectstasks/mytasks/" + this.employeeid).subscribe((result: any) => {
      this.mytasks = result;
      console.log(result);

    })

  }

  Close(id: number) {
    let data = null;
    this.api.put("projectstasks/updatestatus/" + id + "/Completed", data).subscribe((result: any) => {
      console.log(result);
      alert("Status Updated")
      this.load();
    })
  }
  Open(id: number) {
    let data = null;
    this.api.put("projectstasks/updatestatus/" + id + "/Pending", data).subscribe((result: any) => {
      console.log(result);
      alert("Status Updated")
      this.load();
    })
  }


}
