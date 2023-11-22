import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from 'src/app/interfaces/questionnaire.interface';

/**
 * A pipe for sorting by answer date
 */
@Pipe({
  name: 'sortByAnswerDate',
})
export class SortByAnswerDatePipe implements PipeTransform {
  transform(value: IQuestion[]): IQuestion[] {
    const sortedQuestions = [...value];
    return sortedQuestions.sort((question1, question2) => {
      return (
        new Date(question2.answerDate!).getTime() -
        new Date(question1.answerDate!).getTime()
      );
    });
  }
}
