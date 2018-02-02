import {Pipe, PipeTransform} from '@angular/core';
import {IJob} from '../model/ijob.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(positions: IJob[], searchTerm: string): IJob[] {
    if (!positions) {
      return [];
    }
    if (!searchTerm) {
      return positions;
    }
    return positions.filter(position => position.what.toLowerCase().includes(searchTerm)
      || position.who.toLowerCase().includes(searchTerm)
      || position.notes.toLowerCase().includes(searchTerm)
    );

  }

}
