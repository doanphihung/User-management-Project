import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {


  alert!: string;
  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.http.get(API_URL + 'user');
  }

  saveUser(user: any): Observable<any> {
    return this.http.post(API_URL + 'user', user);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(API_URL + `user/${id}`);
  }

  findById(id: any): Observable<any> {
    return this.http.get(API_URL + `user/${id}`);
  }

  editUser(id: any, user: any): Observable<any> {
    return this.http.put<any>(API_URL + 'user/' + id, user);
  }


}
