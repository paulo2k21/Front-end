import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Aves } from './aves.model'; // Importe o modelo de aves

@Injectable({
  providedIn: 'root'
})
export class AvesService {
  private avesSubject = new BehaviorSubject<Aves[]>([]); // Inicialize com um array vazio
  aves$ = this.avesSubject.asObservable();

  constructor() {
    this.loadAvesFromLocalStorage();
  }

  private loadAvesFromLocalStorage() {
    const avesFromLocalStorage = JSON.parse(localStorage.getItem('aves') || '[]');
    this.avesSubject.next(avesFromLocalStorage);
  }

  getAves(): Aves[] {
    return this.avesSubject.value;
  }

  updateAves(aves: Aves[]): void {
    localStorage.setItem('aves', JSON.stringify(aves));
    this.avesSubject.next(aves);
  }
}
