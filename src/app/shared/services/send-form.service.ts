import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  constructor(private http: HttpClient) { }
  sendForm(data): Observable<any> {
    return  this.http.post(`https://jsonplaceholder.typicode.com/posts`, data);
  }
}
