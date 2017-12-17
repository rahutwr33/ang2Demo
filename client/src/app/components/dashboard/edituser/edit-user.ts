import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css']
})
export class EditUser implements OnInit {
form;
message;
messageClass;
loading = true;
currentUrl;
users;
processing = false;
constructor(
    private blog:BlogService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
) {}

updateUserSubmit(){
  this.blog.updateSingleuser(this.users).subscribe(updateuser=>{
    if(!updateuser.success){
     this.messageClass = 'alert alert-danger'; // Set bootstrap error class
    this.message = updateuser.message; // Set error message
    }else{
      this.router.navigate(['/dashboard']);
    }  
})
  
}


ngOnInit() {
  this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    this.blog.getSingleuser(this.currentUrl.id).subscribe(user => {
       this.users = user.data;
       this.loading = false; // Allow loading of blog form
    });
}
}
