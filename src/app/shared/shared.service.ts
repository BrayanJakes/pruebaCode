import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

 
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getLists(){
    return this.http.get(`${this.uri}/list`)
  }
}
