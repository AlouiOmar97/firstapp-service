import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Residence } from '../core/models/residence';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {

  residenceUrl ="http://localhost:3001/residence/"
  constructor(private  http: HttpClient) { }
  fetchAllResidences(): Observable<Residence[]>{
    return this.http.get<Residence []>(this.residenceUrl);
   }
  fetchResidenceById(id:any): Observable<Residence>{
    return this.http.get<Residence>(this.residenceUrl+id);
   }
}
