import { Pipe, PipeTransform } from '@angular/core';

import { IQuestion } from 'src/app/interfaces/questionnaire.interface';

/**
 * A pipe of sorting by creation date
 */
@Pipe({
  name: 'sortByCreationDate',
})
export class SortByCreationDatePipe implements PipeTransform {
  transform(value: IQuestion[]): IQuestion[] {
    const sortedQuestions = [...value];
    return sortedQuestions.sort((question1, question2) => {
      return (
        new Date(question2.creationDate).getTime() -
        new Date(question1.creationDate).getTime()
      );
    });
  }
}
