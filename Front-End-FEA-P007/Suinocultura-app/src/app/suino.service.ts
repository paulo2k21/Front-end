import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Suino } from './suino.model';

@Injectable({
  providedIn: 'root'
})
export class SuinoService {
  private suinosSubject = new BehaviorSubject<Suino[]>([]); // Inicialize com um array vazio
  suinos$ = this.suinosSubject.asObservable();

  constructor() {
    this.loadSuinosFromLocalStorage();
  }

  private loadSuinosFromLocalStorage() {
    const suinosFromLocalStorage = JSON.parse(localStorage.getItem('suinos') || '[]');
    this.suinosSubject.next(suinosFromLocalStorage);
  }

  getSuinos(): Suino[] {
    return this.suinosSubject.value;
  }

  updateSuinos(suinos: Suino[]): void {
    localStorage.setItem('suinos', JSON.stringify(suinos));
    this.suinosSubject.next(suinos);
  }
}
