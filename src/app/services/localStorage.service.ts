import { Injectable } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';
import { Observable } from 'rxjs';

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

  getAnswers(): IAnswer[] {
    return JSON.parse(localStorage.getItem('answers')!);
  }

  setItem(
    destination: string,
    object: IQuestion | IAnswer | IQuestion[] | IAnswer[] | null
  ): void {
    localStorage.setItem(destination, JSON.stringify(object));
  }
}
