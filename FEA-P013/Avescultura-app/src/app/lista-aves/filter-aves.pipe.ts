import { Pipe, PipeTransform } from '@angular/core';
import { Aves } from '../aves.model'; // Importe o modelo de aves

@Pipe({
  name: 'filterAves' // Mude o nome do pipe para 'filterAves'
})
export class FilterAvesPipe implements PipeTransform {
  transform(aves: Aves[], filtroAnilhaPai: string): Aves[] {
    if (!aves || !filtroAnilhaPai) {
      return aves;
    }

    return aves.filter(ave =>
      ave.anilhaPai.toString().toLowerCase().includes(filtroAnilhaPai.toLowerCase())
    );
  }
}
