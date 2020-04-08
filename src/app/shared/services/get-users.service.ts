import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return  this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }
}
