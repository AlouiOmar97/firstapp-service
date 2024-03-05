import { LogService } from './../services/log.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appartement } from '../core/models/appartement';
import { Residence } from '../core/models/residence';
import { AppartmentService } from '../services/appartment.service';
import { Router } from '@angular/router';
import { ResidenceService } from '../services/residence.service';

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
  numEtage: null, 
  surface: null, 
  terrasse: "", 
  surfaceTerrasse: 50, 
  category: "", 
  description: "", 
  residence: null, 
  status: true 
}
imageURL="/assets/images/"
residencesList!: Residence[]
/*residencesList: Residence[]=[ 

  {id: 1, name: "Residence 1", address: "Address 1", image: this.imageURL+"residence1.jpg"}, 

  {id: 2, name: "Residence 2", address: "Address 2", image: this.imageURL+"residence2.jpg"}, 

  {id: 3, name: "Residence 3", address: "Address 3", image: this.imageURL+"residence3.jpg"} 

] */
addAppartForm!: FormGroup
constructor(private logService: LogService, private appartmentService: AppartmentService, private residenceService: ResidenceService ,private router: Router){}
ngOnInit(): void{

  this.residenceService.fetchAllResidences().subscribe((data)=>{
    this.residencesList= data
  })

  this.addAppartForm= new FormGroup({
    terasse: new FormControl(this.appartment.terrasse, [Validators.required, Validators.minLength(3)]),
    category: new FormControl(this.appartment.category, Validators.required),
    numAppart: new FormControl(this.appartment.numAppart, [Validators.required, Validators.min(0)]),
    numEtage: new FormControl(this.appartment.numEtage, [Validators.required, Validators.min(0)]),
    description: new FormControl(this.appartment.description, [Validators.required, Validators.minLength(10)]),
    residence: new FormControl('', Validators.required),
    status: new FormControl(this.appartment.status),
    surfaceTerrasse: new FormControl(this.appartment.surfaceTerrasse),

  })
}

get terasse(){return this.addAppartForm.get('terasse')}
get category(){return this.addAppartForm.get('category')}
get numAppart(){return this.addAppartForm.get('numAppart')}
get numEtage(){return this.addAppartForm.get('numEtage')}
get description(){return this.addAppartForm.get('description')}
get residence(){return this.addAppartForm.get('residence')}

addAppartment(){
  //console.log(this.addAppartForm.value);
  this.addAppartForm.value.residence=this.residencesList[this.addAppartForm.value.residence]
  this.logService.log(this.addAppartForm.value)
  //this.logService.warn(this.addAppartForm.value)
  //this.logService.error(this.addAppartForm.value)
  this.appartmentService.addAppartement(this.addAppartForm.value).subscribe(()=>{
    this.router.navigateByUrl('/appartment')
  })
}

}