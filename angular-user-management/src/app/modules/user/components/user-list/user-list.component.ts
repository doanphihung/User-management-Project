import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../models/user";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../../../service/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  alert: string = this.userService.alert;
  countUser!: string;
  users: User[] = [];
  displayedColumns: string[] = ["No", "Image", "Name", "Email", "Phone", "Action"];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.userService.getAll().subscribe((res) => {
        this.users = res;
        this.countUser = res.length;
        this.dataSource = new MatTableDataSource<User>(this.users);
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
      }, (error) => {console.log(error)},);
  }

  public delete(id: number) {
      if (confirm('Are you sure to delete user?')) {
        this.userService.deleteUser(id).subscribe((res) => {
          this.alert = res.message;
          this.getAll();
          this.router.navigate(['admin/user']);
        })
      }
  }

}
