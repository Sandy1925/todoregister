import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Customer, CustomerLogin } from 'models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: Object;
  title = 'login';
  email!:string;
  customerLogin!:CustomerLogin;
  loginForm!:FormGroup;
  result!:Customer;
 

  constructor(private builder:FormBuilder,private http:HttpClient){

    console.log(localStorage.getItem("todoEmail"));
    console.log(window.localStorage["todoMail"]);
    var cookies=document.cookie.split(";");
    for(let i=0;i<cookies.length;i++){
      var data=cookies[i].split("=");
      for (let j=0;j<data.length;j++){
        if(data[j]===" todoEmail"){
          console.log(data[j+1]);
          this.email=data[j+1];
        }
      }
    }
    this.loginForm=this.builder.group({

      email: new FormControl(this.email),
      password: new FormControl(''),

    }


    )
  }

  login(){

    this.customerLogin=this.loginForm.value;
    console.log(this.customerLogin);
    this.http.post<Customer>("http://localhost:8000/api/login",this.customerLogin).subscribe(data =>{
      console.log(data);
      this.result=data;
      console.log(this.result);
      document.cookie="todoEmail"+"="+this.result.email;
      window.location.href="http://localhost:4203"
      
    
    });



  }
  

  
}
