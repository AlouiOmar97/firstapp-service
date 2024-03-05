import { Component, Input } from '@angular/core';
import { Appartement } from '../core/models/appartement';

@Component({
  selector: 'app-appartment-card',
  templateUrl: './appartment-card.component.html',
  styleUrls: ['./appartment-card.component.css']
})
export class AppartmentCardComponent {
  @Input() appartmentC: Appartement
}
