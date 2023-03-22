import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: string = ''
  isCollapse: boolean = true
  currentAcno: Number = 0
  balance:Number=0
  depositMsg:string=''
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  constructor(private api:ApiService,private fb:FormBuilder){

  }

  ngOnInit() {
    if (localStorage.getItem("username")) {
      this.user = localStorage.getItem("username") || ''

    }
  }

  collapse() {
    this.isCollapse = !this.isCollapse

  }

  getBalance() {
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      console.log(this.currentAcno);
      this.api.getBalance(this.currentAcno)
      .subscribe(
        (result:any)=>{
          console.log(result);
          this.balance=result.balance
          
          
        }
      )
    }
  }

  //deposit
  deposit(){
    if(this.depositForm.valid){
      let amount=this.depositForm.value.amount
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
      this.api.deposit(this.currentAcno,amount)
      .subscribe(
        (result:any)=>{
          console.log(result);
          this.depositMsg=result.message
        },
        //error
        (result:any)=>{
          this.depositMsg=result.error.message
        }
      )
      



    }
    else{
      alert('Invalid Form')
    }
  }
}
