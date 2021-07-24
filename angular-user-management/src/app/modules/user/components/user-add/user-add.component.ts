import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  formAddUser!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formAddUser = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
    });
  }

  submit() {
    let user = this.formAddUser?.value;
    this.userService.saveUser(user).subscribe((res) => {
      this.userService.alert = 'Create user successfully!';
      this.toastr.success('Create user successfully!', 'Create user', {timeOut: 1000});
      this.router.navigate(['admin/user']);
    }, (error)=> {
      this.toastr.error('Create user fail!', 'Create user', {timeOut: 2000, positionClass: 'toast-bottom-left'});
    });
  }

}
