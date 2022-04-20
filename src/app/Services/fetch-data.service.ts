import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  constructor(private http: HttpClient) {}
  URL = 'http://87.242.76.45/testdata.json'

  getPersonData() {
    return this.http.get(this.URL)
  }
}
