import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx';

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
  selector: 'app-workreports',
  templateUrl: './workreports.component.html',
  styleUrls: ['./workreports.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class WorkreportsComponent implements OnInit {


  reportlistoriginal: any[] = [];
  reportlist: any[] = [];
  projects: any;
  employees: any;
  projectstasks: any;
  projectname = "";
  employeename = "";
  projectstatus: any;
  status = "";
  rangepicker = "";
  fileName= 'ExcelSheet.xlsx';
  usertype = "false";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get("projects/").subscribe((result: any) => {
      this.projects = result;
      // console.log(result);

    })
    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
      // console.log(result);

    })
    this.api.get("projectstasks").subscribe((result: any) => {
      this.projectstasks = result;
      // console.log(result);

    })

    this.load();

  }
  load() {
    this.api.get("projectstasks/reportlist").subscribe((result: any) => {
      this.reportlistoriginal = result;
      console.log(result);
      this.changed();
    })

  }

  changed() {
    console.log("Project:" + this.projectname, "Emp:" + this.employeename, "Status:" + this.status, "range:" + this.rangepicker, "Changed");
    // return;

    this.reportlist = this.reportlistoriginal.filter((data: any) => {
      let toshow = false;
      if ((this.employeename == "" || data.employeename == this.employeename) && (this.projectname == "" || data.projectname == this.projectname) && (this.status == "" || data.projectstatus == this.status) && (this.rangepicker == "" || data.pt.startdate == this.rangepicker)) {
        toshow = true;
      }
      if (toshow)
        return data;
    });
  }

  Print(printtable:string){
    let printContents = document.getElementById(printtable)?.innerHTML;
    // var printContents = this. filteredDataAfterDate;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents!;

     window.print();

     document.body.innerHTML = originalContents;
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  Reset(){
    this.projectname = "";
    this.employeename = "";
    this.status = "";

    this.load();
  }
}

