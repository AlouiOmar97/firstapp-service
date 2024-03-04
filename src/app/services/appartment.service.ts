import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appartement } from '../core/models/appartement';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppartmentService {
  apartmentUrl ="http://localhost:3001/appartement/"
  constructor(private  http: HttpClient) { }

  getSameValueOf(list:any[], critiria:string, value:any){
    let n = 0
    for(let i in list){
      if(list[i][critiria] === value){
        n++
      }
    }
    return n
  }

  addAppartement(appartement:Appartement){
    return this.http.post(this.apartmentUrl,appartement);
     }
  fetchAllAppartments(): Observable<Appartement[]>{
    return this.http.get<Appartement []>(this.apartmentUrl);
   }

  fetchAppartmentById(id:any): Observable<Appartement>{
      return this.http.get<Appartement>(this.apartmentUrl+id);
     }
  updateAppartement(appartement:Appartement,id:any){
        return this.http.put(this.apartmentUrl+id,appartement);
   }
  
}
