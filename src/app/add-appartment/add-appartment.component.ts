import { LogService } from './../services/log.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appartement } from '../core/models/appartement';
import { Residence } from '../core/models/residence';
import { AppartmentService } from '../services/appartment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-appartment',
  templateUrl: './add-appartment.component.html',
  styleUrls: ['./add-appartment.component.css']
})
export class AddAppartmentComponent {
residences: Residence = {id: 3, name: "Residence 3", address: "Address 3", image:"image 3"} 
appartment: Appartement={
  id:0,
  numAppart: null, 
  numEtage: 0, 
  surface: null, 
  terrasse: "", 
  surfaceTerrasse: 0, 
  category: "", 
  description: "", 
  residence: null, 
  status: true 
}
imageURL="/assets/images/"
residencesList: Residence[]=[ 

  {id: 1, name: "Residence 1", address: "Address 1", image: this.imageURL+"residence1.jpg"}, 

  {id: 2, name: "Residence 2", address: "Address 2", image: this.imageURL+"residence2.jpg"}, 

  {id: 3, name: "Residence 3", address: "Address 3", image: this.imageURL+"residence3.jpg"} 

] 
addAppartForm!: FormGroup
constructor(private logService: LogService, private appartmentService: AppartmentService, private router: Router){}
ngOnInit(): void{
  this.addAppartForm= new FormGroup({
    terasse: new FormControl(this.appartment.terrasse, [Validators.required, Validators.minLength(3)]),
    category: new FormControl(this.appartment.category, Validators.required),
    numAppart: new FormControl(this.appartment.numAppart, [Validators.required, Validators.min(0)]),
    residence: new FormControl(this.appartment.residence, Validators.required),

  })
}

get terasse(){return this.addAppartForm.get('terasse')}
get category(){return this.addAppartForm.get('category')}
get numAppart(){return this.addAppartForm.get('numAppart')}
get residence(){return this.addAppartForm.get('residence')}

addAppartment(){
  //console.log(this.addAppartForm.value);
  this.logService.log(this.appartment)
  this.logService.warn(this.addAppartForm.value)
  this.logService.error(this.addAppartForm.value)
  this.appartmentService.addAppartement(this.addAppartForm.value).subscribe(()=>{
    this.router.navigate(['/appartment/5'])
  })
}

}