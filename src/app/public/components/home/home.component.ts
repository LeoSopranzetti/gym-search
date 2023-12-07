import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { 
    this.myForm = this.fb.group({
      selectedOption: ['']
    });
  }

  ngOnInit() {
    this.myForm.get('selectedOption')?.valueChanges.subscribe(value => {
      this.morning = value === '1';
      this.afternoon = value === '2';
      this.night = value === '3';
    });
  }

  public change(){

  }

}
