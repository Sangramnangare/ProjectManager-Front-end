import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  toggle() {
    throw new Error('Method not implemented.');
  }

  usertype = false;
  element: any;

  ngOnInit(): void {
    if (localStorage.getItem("usertype") == "admin") {
      this.usertype = true;
    }
  }

}
