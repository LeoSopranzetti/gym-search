import { Component, Input, OnInit } from '@angular/core';
import { Gym } from '../../models/gym';

@Component({
  selector: 'gym-card',
  templateUrl: './gym-card.component.html',
  styleUrls: ['./gym-card.component.scss']
})
export class GymCardComponent implements OnInit {

  @Input() gym!: Gym;

  constructor() { }

  ngOnInit() {
  }

}
