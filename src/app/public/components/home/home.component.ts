import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PublicService } from '../../services/public.service';
import { catchError, tap } from 'rxjs';
import { Gym } from '../../models/gym';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;
  morning: boolean = false;
  afternoon: boolean = false;
  night: boolean = false;
  numberOfResults: number = 0;
  openOrClosed: boolean = false;
  allGyms: Gym[] = [];

  constructor(private fb: FormBuilder, private publicService: PublicService) { 
    this.myForm = this.fb.group({
      selectedOption: [''],
      openOrClosed: [false]
    });
  }

  ngOnInit() {
    this.manipulationOfForm();
    this.getAllGyms();

  }

  private manipulationOfForm() {
    this.myForm.get('selectedOption')?.valueChanges.subscribe(value => {
      this.morning = value === '1';
      this.afternoon = value === '2';
      this.night = value === '3';
    });
    this.myForm.get('openOrClosed')?.valueChanges.subscribe(value => {
      this.openOrClosed = value;
    });
  }

  public getAllGyms(){

    this.publicService.getGyms().pipe(
      tap((res : any ) => {
        this.allGyms = res.locations.slice(0, 160);
      }),
      catchError((error)=> {
        return error
      })
    ).subscribe()

  }

}
