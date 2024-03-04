import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogService } from '../services/log.service';
import { AppartmentService } from '../services/appartment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Residence } from '../core/models/residence';
import { Appartement } from '../core/models/appartement';

@Component({
  selector: 'app-update-appartment',
  templateUrl: './update-appartment.component.html',
  styleUrls: ['./update-appartment.component.css']
})
export class UpdateAppartmentComponent {
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
  id!:number
  imageURL="/assets/images/"
  residencesList: Residence[]=[ 
  
    {id: 1, name: "Residence 1", address: "Address 1", image: this.imageURL+"residence1.jpg"}, 
  
    {id: 2, name: "Residence 2", address: "Address 2", image: this.imageURL+"residence2.jpg"}, 
  
    {id: 3, name: "Residence 3", address: "Address 3", image: this.imageURL+"residence3.jpg"} 
  
  ] 
  updateAppartForm!: FormGroup
  constructor(private logService: LogService, private appartmentService: AppartmentService, private router: Router,private activatedRoute: ActivatedRoute){}
  ngOnInit(): void{
    let x=""
    this.id=this.activatedRoute.snapshot.params['id']
    this.appartmentService.fetchAppartmentById(this.id).subscribe((data)=>{
      console.log(data);
      this.appartment=data
      console.log(this.appartment.terrasse);
      
      this.updateAppartForm= new FormGroup({
        terrasse: new FormControl(this.appartment.terrasse, [Validators.required, Validators.minLength(3)]),
        category: new FormControl(this.appartment.category, Validators.required),
        numAppart: new FormControl(this.appartment.numAppart, [Validators.required, Validators.min(0)]),
        residence: new FormControl(this.appartment.residence, Validators.required),
    
      })
      
    })
    
  }
  
  get terrasse(){return this.updateAppartForm.get('terrasse')}
  get category(){return this.updateAppartForm.get('category')}
  get numAppart(){return this.updateAppartForm.get('numAppart')}
  get residence(){return this.updateAppartForm.get('residence')}
  
  updateAppartment(){
    //console.log(this.addAppartForm.value);
    this.logService.log(this.appartment)
    this.logService.warn(this.updateAppartForm.value)
    this.logService.error(this.updateAppartForm.value)
    this.appartmentService.updateAppartement(this.updateAppartForm.value,this.id).subscribe(()=>{
      this.router.navigate(['/appartment/5'])
    })
  }
}
