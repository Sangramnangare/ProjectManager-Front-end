import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata:any;
  login:any;

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {

    this.load();
  }
  load(){
    this.logindata = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })


  }

  Login(data:any){
   this.api.post("authentication/login",data).subscribe((result:any)=>{
    if(result.length == 0){
      alert("Invalid Cretentials");
    }
    else if(result[0].email == "gatadeabhijit@gmail.com" && result[0].password == "Abhijit"){
      localStorage.setItem("usertype","admin");
      localStorage.setItem("id",result[0].id);
      localStorage.setItem("name",result[0].name);
      localStorage.setItem("email",result[0].email);

      this.router.navigate(['admin/dashboard'])
    }
    else{
      localStorage.setItem("usertype","employee");
      localStorage.setItem("id",result[0].id);
      localStorage.setItem("name",result[0].name);
      localStorage.setItem("email",result[0].email);

      this.router.navigate(['admin/dashboard'])
    }
   })
  }

}
