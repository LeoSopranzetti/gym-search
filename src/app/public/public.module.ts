import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './components/home/home.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCheckboxModule, FormsModule, MatRadioModule, ReactiveFormsModule
  ],
  declarations: [HomeComponent]
})
export class PublicModule { }
