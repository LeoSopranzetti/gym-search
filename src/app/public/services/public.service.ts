import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gym } from '../models/gym';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor( private httpClient: HttpClient ) { }

  getGyms(){
    return this.httpClient.get(`https://test-frontend-developer.s3.amazonaws.com/data/locations.json`);
  }

}
