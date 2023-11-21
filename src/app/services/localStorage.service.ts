import { Injectable } from '@angular/core';
import { IAnswer, IQuestion } from '../interfaces/questionnaire.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getAllQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('questions')!);
  }

  getAnsweredQuestions(): IQuestion[] {
    return JSON.parse(localStorage.getItem('answeredQuestions')!);
  }
  getAnswers(): IAnswer[] {
    return JSON.parse(localStorage.getItem('answers')!);
  }
}
