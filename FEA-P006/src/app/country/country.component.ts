import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  camposDoForm: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://restcountries.com/v3.1/all')
      .subscribe((data: any[]) => {
        const firstRecord = data[0];
        this.camposDoForm = Object.keys(firstRecord).map(key => ({ tipo: 'text', nome: key, rotulo: key }));
        this.preencherFormulario(firstRecord);
      });
  }

  preencherFormulario(data: any): void {
    Object.keys(data).forEach(key => {
      const input = document.getElementById(key) as HTMLInputElement;
      if (input) {
        input.value = data[key];
      }
    });
  }
}
