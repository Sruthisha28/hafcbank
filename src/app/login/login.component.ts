import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // string interpolation
  aim="Your perfect banking partner"

// property binding
  accno="Account Number Please"




  acno=""
  pswd=""



  // login group model creation
  loginForm=this.fb.group({

      // form array create
      acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]


  })
  

  database:any={
    1000:{acno:1000,uname:"anu",password:1000,balance:5000},
    1001:{acno:1001,uname:"manu",password:1001,balance:5000},
    1002:{acno:1002,uname:"sanu",password:1002,balance:5000}
  }

  constructor(private routerLogin:Router,private ds:DataService,private fb:FormBuilder ) { }

  ngOnInit(): void {
  }

// acno change
 acnoChange(event:any){
   this.acno=event.target.value
   console.log(this.acno)
 }

//  pswd change
pswdChange(event:any){
  this.pswd=event.target.value
  console.log(this.pswd)
}


  // login

  // <!-- event binding using $event -->

  // login(){
  //  var acno=this.acno
  //  var pswd = this.pswd

  //  let database = this.database
  //  if(acno in database){

  //   if(pswd==database[acno]["password"]){
  //     alert("Login successful!!!")
  //   }
  //   else{
  //     alert("Incorrect password")
  //   }
  //  }
  //  else{
  //    alert("User doesnot exist!!!")
  //  }
  //  }
  // }





  // <!-- event binding using template referencing variable -->


// login(a:any,p:any){

//   console.log(a)


//    var acno=a.value
//    var pswd = p.value

//    let database = this.database
//    if(acno in database){

//     if(pswd==database[acno]["password"]){
//       alert("Login successful!!!")
//     }
//     else{
//       alert("Incorrect password")
//     }
//    }
//    else{
//      alert("User doesnot exist!!!")
//    }
//    }
//   }



                
// <!-- two way binding -->
  login(){
   var acno=this.loginForm.value.acno
   var pswd = this.loginForm.value.pswd
if(this.loginForm.valid){

  // asynchronous call-login
 this.ds.login(acno,pswd)

 .subscribe((result:any)=>{
   if(result){
     localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
     localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
     localStorage.setItem('token',JSON.stringify(result.token))

     alert(result.message)
     this.routerLogin.navigateByUrl("dashboard")


   }
 },
 (result)=>{
   alert(result.error.message)
 }
 )
 

  
     }
     else{
       alert("Invalid Form")
     }
    }
      }
   