import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PublicService } from '../../services/public.service';
import { catchError, tap } from 'rxjs';
import { Gym } from '../../models/gym';

interface Schedule {
  weekdays: string;
  hour: string;
}

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
  actualGymPage: Gym[] = [];
  itemsPerPage: number = 9; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  totalPagesToShow: number = 3;

  activePage: number | null = null;

  constructor(private fb: FormBuilder, private publicService: PublicService, private renderer: Renderer2) { 
    this.myForm = this.fb.group({
      selectedOption: [''],
      openOrClosed: [false]
    });
  }

  ngOnInit() {
    this.manipulationOfForm();
    this.getAllGyms();
    this.setPage(1);

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
    this.actualGymPage = [];
    this.allGyms = [];

    this.publicService.getGyms().pipe(
      tap((res : any ) => {
        this.allGyms = res.locations;
        this.totalPages = Math.ceil(this.allGyms.length / this.itemsPerPage);
        this.actualGymPage = this.getPaginatedItems();
      }),
      catchError((error)=> {
        return error
      })
    ).subscribe()

  }

  getPaginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allGyms.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.actualGymPage = this.getPaginatedItems();
    }

    this.activePage = this.currentPage;
  }

  totalPagesArray(): number[] {
    let totalPages = new Array(this.totalPages).fill(0).map((_, index) => index + 1);
    var slicedArray = this.sliceArray(totalPages, this.currentPage);
    return slicedArray as number[];
  }

  sliceArray(totalPages: number[], numero: number) {
    const index = totalPages.indexOf(numero);

    if (index !== -1) {
      const start = Math.max(0, index - 3);
      const end = Math.min(index + 4, totalPages.length);

      return totalPages.slice(start, end);
    } else {
      return console.log('Número não encontrado no array.');
    }
  }

  onFilterChanged() {

  }



}
