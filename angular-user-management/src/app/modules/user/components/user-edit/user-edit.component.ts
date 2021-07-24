import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  formEditUser!: FormGroup
  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.formEditUser = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      address: ['']
    })
    let id = this.route.snapshot.paramMap.get('id');
    this.userService.findById(id).subscribe( (res) => {
      this.formEditUser.patchValue(res);
    });
  }

  public submit() {
    let id = this.route.snapshot.paramMap.get('id');
    let user = this.formEditUser.value;
    this.userService.editUser(id, user).subscribe( (res) => {
      console.log(res);
      this.userService.alert = res.message;
      this.router.navigate(['admin/user']);
    }, (error) => {console.log(error)});
  }

}
