import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: any;
  email: any;

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.name = localStorage.getItem("name");
    this.email = localStorage.getItem("email");
    if (localStorage.getItem("usertype") != null) {
      if (localStorage.getItem("usertype") != "employee") {
        if (localStorage.getItem("usertype") != "admin") {
        this.router.navigate(["/"])
      }
    }
    }
    else (
      this.router.navigate(['/'])
    )
  }

  SignOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
