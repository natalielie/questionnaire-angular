import { Injectable } from '@angular/core';

import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';

/**
 * A Local Storage Service for work with local storage diractly
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getAllQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('questions')!);
  }

  getAllAnswers(): IAnswer[] {
    return JSON.parse(localStorage.getItem('answers')!);
  }

  /**
   * Set an item to a  Local Storage
   */
  setItem(
    destination: string,
    object: IQuestion | IAnswer | IQuestion[] | IAnswer[] | null
  ): void {
    localStorage.setItem(destination, JSON.stringify(object));
  }
}
