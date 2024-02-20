import { LogService } from './../services/log.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appartement } from '../core/models/appartement';
import { Residence } from '../core/models/residence';

@Component({
  selector: 'app-add-appartment',
  templateUrl: './add-appartment.component.html',
  styleUrls: ['./add-appartment.component.css']
})
export class AddAppartmentComponent {
residence: Residence = {id: 3, name: "Residence 3", address: "Address 3", image:"image 3"} 
appartment: Appartement={
  id:0,
  numAppart: 0, 
  numEtage: 0, 
  surface: 0, 
  terrasse: "", 
  surfaceTerrasse: 0, 
  category: "", 
  description: "", 
  residence: this.residence, 
  status: true 
}

addAppartForm!: FormGroup
constructor(private logService: LogService){}
ngOnInit(): void{
  this.addAppartForm= new FormGroup({
    terasse: new FormControl(this.appartment.terrasse, [Validators.required, Validators.minLength(3)]),
    numAppart: new FormControl(this.appartment.numAppart, Validators.required)
  })
}

get terasse(){return this.addAppartForm.get('terasse')}
get numAppart(){return this.addAppartForm.get('numAppart')}

addAppartment(){
  //console.log(this.addAppartForm.value);
  this.logService.log(this.addAppartForm.value)
  this.logService.warn(this.addAppartForm.value)
  this.logService.error(this.addAppartForm.value)
}

}