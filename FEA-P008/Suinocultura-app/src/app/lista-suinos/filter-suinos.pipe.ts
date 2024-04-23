import { Pipe, PipeTransform } from '@angular/core';
import { Suino } from '../suino.model';

@Pipe({
  name: 'filterSuinos'
})
export class FilterSuinosPipe implements PipeTransform {
  transform(suinos: Suino[], filtroBrincoPai: string): Suino[] {
    if (!suinos || !filtroBrincoPai) {
      return suinos;
    }

    return suinos.filter(suino =>
      suino.brincoPai.toString().toLowerCase().includes(filtroBrincoPai.toLowerCase())
    );
  }

}
