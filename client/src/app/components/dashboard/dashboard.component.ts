import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit  {
  userList;
  confirmResult:boolean = null;
  message;
  messageClass;
  constructor(private blog:BlogService,private dialogService:DialogService,private router: Router) { }

   ngOnInit() {
    this.blog.getAlluser().subscribe(users => {
    this.userList = users.data; 
    
    });
 
  }

  deleteuser(id:any){
   this.dialogService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Are you want to delete this user?'})
      .subscribe((isConfirmed)=>{
        this.confirmResult = isConfirmed;
        if(this.confirmResult==true){
          this.blog.deleteSingleuser(id).subscribe(response=>{
             if(!response.success){
              this.messageClass = 'alert alert-danger'; // Set bootstrap error class
              this.message = response.message; // Set error message
            }else{
              console.log("1111")
               setTimeout(() => {
                  this.router.navigate(['/profile']); 
                }, 2000);
               
              }  
          })
        }
    }); 
  }
  
}

