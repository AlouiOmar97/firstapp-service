import { Component } from '@angular/core';
import { AppartmentService } from '../services/appartment.service';
import { Appartement } from '../core/models/appartement';

@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrls: ['./appartement.component.css']
})
export class AppartementComponent {
  appartmentList: Appartement[]
  constructor(private appartmentService: AppartmentService){}
  ngOnInit(){
    this.appartmentService.fetchAllAppartments().subscribe((data)=>{
      console.log(data);
      
      this.appartmentList = data
    })
  }
}
