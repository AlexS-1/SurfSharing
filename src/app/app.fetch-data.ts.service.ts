import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // import the HttpClientModule

@Injectable({
  providedIn: 'root'
})
export class AppFetchDataTsService {

  constructor(private http: HttpClient) { }

  getContentData() {
    return this.http.get('../assets/content/course.json'); // Read the content of the json file
  }
}